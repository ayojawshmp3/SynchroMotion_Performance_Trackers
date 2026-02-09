"use client";

import { useEffect, useRef, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";

type Point = {
  t: number; // time (seconds)
  v: number; // magnitude
};

export default function PowerGraph({
  data,
  showLine = true,
}: {
  data: Point[];
  showLine?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  // Wait until the container has a real size to avoid Recharts measurement warnings
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ w: width, h: height });
      setReady(width > 0 && height > 0);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isNarrow = size.w > 0 && size.w < 520;
  const hideLabels = size.w > 0 && size.w < 380;
  const axisFont = hideLabels ? 9 : isNarrow ? 10 : 12;
  const labelFont = hideLabels ? 9 : isNarrow ? 10 : 12;
  const leftMargin = hideLabels ? 28 : isNarrow ? 30 : 52; // keep some room for tick numbers
  const bottomMargin = hideLabels ? 16 : isNarrow ? 24 : 28;
  const yLabelOffset = isNarrow ? 0 : 12;
  const xLabelOffset = isNarrow ? 2 : -4;
  const yDomainLive: [number, number | "auto" | ((dataMax: number) => number)] = [
    0,
    (dataMax: number) => (dataMax > 0 ? dataMax : 10),
  ];
  const yDomainIdle: [number, number] = [0, 10];
  const idleTicks = [0, 2, 4, 6, 8, 10];
  const yTicks = showLine ? undefined : idleTicks;
  const yTickCount = showLine ? (hideLabels ? 4 : 6) : idleTicks.length;

  const renderYAxisLabel = ({ viewBox }: any) => {
    if (!viewBox) return null;
    const { x, y, height } = viewBox;
    const centerY = y + height / 2;
    const lineHeight = labelFont + 2;
    const labelX = x - (isNarrow ? 6 : 10);

    return (
      <text
        x={labelX}
        y={centerY - lineHeight / 2}
        textAnchor="middle"
        fill="currentColor"
        fontSize={labelFont}
      >
        <tspan x={labelX} dy={-2}>
          Movement
        </tspan>
        <tspan x={labelX} dy={lineHeight}>
          Magnitude
        </tspan>
      </text>
    );
  };

  return (
    <div ref={hostRef} className="h-full w-full">
      {ready ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 16, bottom: bottomMargin, left: leftMargin }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity={0.35} />
                <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

            {/* Time axis */}
            <XAxis
              dataKey="t"
              tick={{ fontSize: axisFont, fill: "currentColor" }}
              tickFormatter={(t) => `${t.toFixed(1)}s`}
              label={
                hideLabels
                  ? undefined
                  : {
                      value: "Time (s)",
                      position: "insideBottom",
                      offset: xLabelOffset,
                      style: { fontSize: labelFont, fill: "currentColor" },
                    }
              }
            />

            {/* Magnitude axis */}
            <YAxis
              tick={{ fontSize: axisFont, fill: "currentColor" }}
              domain={showLine ? yDomainLive : yDomainIdle}
              tickCount={yTickCount}
              ticks={yTicks}
              tickFormatter={(v: number) => v.toFixed(0)}
            >
              {!hideLabels && (
                <Label
                  position="left"
                  offset={yLabelOffset}
                  content={renderYAxisLabel}
                />
              )}
            </YAxis>

            {showLine && (
              <Line
                type="monotone"
                dataKey="v"
                name="Magnitude"
                stroke="currentColor"
                strokeWidth={3}
                dot={{ r: 2, strokeWidth: 1, fill: "currentColor" }}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
                connectNulls
                fill="url(#lineGradient)"
                fillOpacity={1}
                // use area-like fill under the line
                strokeOpacity={1}
                legendType="none"
                // Recharts Line supports area-style fill when fill + connectNulls are set
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full w-full" />
      )}
    </div>
  );
}
