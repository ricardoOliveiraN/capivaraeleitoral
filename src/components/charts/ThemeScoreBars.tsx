"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ThemeScore } from "@/lib/types";
import { THEME_MAP } from "@/lib/themes";

export default function ThemeScoreBars({
  scores,
  height = 320,
}: {
  scores: ThemeScore[];
  height?: number;
}) {
  const data = scores.map((item) => ({
    theme: item.theme,
    short: THEME_MAP[item.theme].short,
    score: item.score,
    color: THEME_MAP[item.theme].color,
  }));

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "var(--muted)" }}
          />
          <YAxis
            type="category"
            dataKey="short"
            width={92}
            tick={{ fontSize: 12, fill: "var(--muted)" }}
          />
          <Tooltip
            cursor={{ fill: "var(--surface-muted)" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--border)",
              fontSize: 12,
            }}
            formatter={(value) => [`${value}/100`, "Índice de atuação"]}
          />
          <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={18}>
            {data.map((item) => (
              <Cell key={item.theme} fill={item.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
