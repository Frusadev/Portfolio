import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export const alt = "Daniel Ametsowou — hypercreative imagination fueled creative";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const filePath = path.join(process.cwd(), "public/danielras.png");
  const imageBuffer = fs.readFileSync(filePath);
  const base64 = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: "#EDEDED",
        }}
      >
        {/* Top Section: Photo at top-left + site tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
          >
            <div
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#141416",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src={base64}
                alt="Daniel"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "38px",
                  fontWeight: 600,
                  letterSpacing: "-0.5px",
                  color: "#EDEDED",
                }}
              >
                Daniel Ametsowou
              </span>
              <span
                style={{
                  fontSize: "18px",
                  color: "#858585",
                  fontFamily: "monospace",
                }}
              >
                danielametsowou.com
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: "46px",
              lineHeight: 1.2,
              fontWeight: 500,
              letterSpacing: "-1px",
              color: "#EDEDED",
            }}
          >
            hypercreative, imagination fueled creative.
          </div>
          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.5,
              color: "#858585",
            }}
          >
            Exploring quantitative engineering, systems architecture, and curious digital tools built outside the box.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
