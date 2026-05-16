/**
 * Mailchimp embedded-form JSONP subscription helper.
 *
 * Wraps the JSONP pattern in a Promise so components don't need to manage
 * global window callbacks or script tag injection themselves.
 *
 * Usage:
 *   const result = await subscribeToMailchimp(MAILCHIMP_URL, email);
 *   if (result.success) { ... } else { console.error(result.message); }
 */

const TIMEOUT_MS = 8_000;

export interface MailchimpResult {
  success: boolean;
  message: string;
}

export function subscribeToMailchimp(
  mailchimpUrl: string,
  email: string
): Promise<MailchimpResult> {
  return new Promise((resolve) => {
    // Unique callback name per call — prevents collisions if called concurrently
    const cbName = `_mc_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    const url = new URL(mailchimpUrl.replace('/post?', '/post-json?'));
    url.searchParams.delete('f_id');
    url.searchParams.set('EMAIL', email);
    url.searchParams.set('c', cbName);

    let settled = false;
    const settle = (result: MailchimpResult) => {
      if (settled) return;
      settled = true;
      delete (window as unknown as Record<string, unknown>)[cbName];
      script.remove();
      resolve(result);
    };

    (window as unknown as Record<string, unknown>)[cbName] = (data: { result: string; msg: string }) => {
      if (data.result === 'success') {
        settle({ success: true, message: '' });
      } else {
        settle({
          success: false,
          message: data.msg?.includes('already')
            ? 'That email is already subscribed.'
            : 'Something went wrong. Please try again.',
        });
      }
    };

    const script = document.createElement('script');
    script.src = url.toString();
    script.onerror = () => settle({ success: false, message: 'Unable to subscribe. Please try again.' });
    document.body.appendChild(script);

    // Timeout guard — Mailchimp callback may never fire if the script 404s silently
    setTimeout(() => settle({ success: false, message: 'Request timed out. Please try again.' }), TIMEOUT_MS);
  });
}
