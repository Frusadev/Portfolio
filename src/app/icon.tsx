import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  const filePath = path.join(process.cwd(), "public/danielras.png");
  const imageBuffer = fs.readFileSync(filePath);
  const base64 = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          overflow: "hidden",
          background: "#050505",
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
    ),
    {
      ...size,
    }
  );
}
