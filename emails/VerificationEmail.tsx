import {
  Html,
  Head,
  Font,
  Preview,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <div
        style={{
          color: "#1a202c",
          padding: "0",
          margin: "0",
          fontFamily: "Arial, sans-serif",
          width: "100%",
          textAlign: "center",
        }}
      >
        <table
          role="presentation"
          style={{
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  role="presentation"
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          backgroundColor: "#d9e3c8",
                          padding: "40px",
                        }}
                        align="center"
                      >
                        <div
                          style={{
                            height: "4rem",
                            width: "4rem",
                            backgroundColor: "black",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img src="https://595b163b-aa35-45a0-a998-b01905cb229e.b-cdn.net/e/535fab95-0d65-4c42-ad7f-a3bbd02751fc/996eb1fa-cbce-46a7-a2a9-4adb97d6ee41.png" alt="Logo" style={{}} />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ padding: "20px", textAlign: "left" }}>
                        <p
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#2d3748",
                            marginBottom: "1rem",
                          }}
                        >
                          Hello {username},
                        </p>
                        <p
                          style={{
                            fontSize: "1rem",
                            color: "#4a5568",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Anonymous Feedback Management System with Secure
                          Authentication and AI-Suggested Feedback.
                        </p>
                        <p
                          style={{
                            fontSize: "1rem",
                            color: "#4a5568",
                            marginBottom: "1.5rem",
                          }}
                        >
                          True Feedback - Where your identity remains a secret.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" style={{ padding: "20px" }}>
                        <div
                          style={{
                            backgroundColor: "#d9e3c8",
                            color: "#2d3748",
                            padding: "12px 40px",
                            borderRadius: "6px",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                          }}
                        >
                          {otp}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ padding: "20px", textAlign: "left" }}>
                        <p
                          style={{
                            fontSize: "1rem",
                            color: "#4a5568",
                          }}
                        >
                          Thank you!
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td
                        align="center"
                        style={{
                          backgroundColor: "#f7fafc",
                          padding: "10px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "#718096",
                            margin: "0",
                          }}
                        >
                          © 2025 True Feedback. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Html>
  );
}