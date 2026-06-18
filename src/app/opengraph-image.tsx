import { ImageResponse } from "next/og";

export const alt = "Rally — Stay consistent, not perfect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAF9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              backgroundColor: "#18181b",
            }}
          />
          <span style={{ fontSize: 96, fontWeight: 800, color: "#18181b" }}>
            Rally
          </span>
        </div>
        <p
          style={{
            marginTop: 32,
            fontSize: 34,
            color: "#71717a",
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          Stay consistent, not perfect.
        </p>
      </div>
    ),
    { ...size }
  );
}
