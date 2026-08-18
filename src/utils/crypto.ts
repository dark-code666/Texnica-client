// Cifra el password en el navegador (RSA-OAEP SHA-256) para que no viaje en claro
// por la red ni se vea en el Network tab del navegador.
// El servidor expone la clave pública en GET /api/auth/public-key.
export async function encryptRsaOaep(publicKeyPem: string, plaintext: string): Promise<string> {
  const pem = publicKeyPem
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .replace(/\s+/g, '');
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    'spki',
    der,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt']
  );
  const enc = await crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    key,
    new TextEncoder().encode(plaintext)
  );
  // Convertir ArrayBuffer -> base64
  const bytes = new Uint8Array(enc);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}
