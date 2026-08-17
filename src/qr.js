import QRCode from 'qrcode';

/**
 * Generates a Base64 QR code image data URL for a given string content.
 * Can be used directly in an img src tag.
 * @param {string} text The content to encode in the QR code (e.g. Booking ID)
 * @param {boolean} isDarkTheme Whether the dark theme colors should be used
 * @returns {Promise<string>} A promise resolving to the data URL string
 */
export async function generateQRDataUrl(text, isDarkTheme = false) {
  try {
    const darkColor = isDarkTheme ? '#f8fafc' : '#0f172a'; // light slate vs dark slate
    const lightColor = isDarkTheme ? '#1e293b' : '#ffffff'; // dark slate vs white background

    return await QRCode.toDataURL(text, {
      margin: 1,
      width: 256,
      errorCorrectionLevel: 'H',
      color: {
        dark: darkColor,
        light: lightColor
      }
    });
  } catch (err) {
    console.error('Failed to generate QR code:', err);
    // Fallback if library fails
    return '';
  }
}
