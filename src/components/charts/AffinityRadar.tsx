"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { ThemeId, ThemeScore } from "@/lib/types";
import { THEME_IDS, THEME_MAP } from "@/lib/themes";

export interface RadarSeries {
  id: string;
  name: string;
  color: string;
  scores: ThemeScore[];
}

export default function AffinityRadar({
  series,
  height = 360,
}: {
  series: RadarSeries[];
  height?: number;
}) {
  const data = THEME_IDS.map((theme: ThemeId) => {
    const row: { theme: string; full: string; [key: string]: number | string } = {
      theme: THEME_MAP[theme].short,
      full: THEME_MAP[theme].label,
    };
    for (const item of series) {
      row[item.id] =
        item.scores.find((score) => score.theme === theme)?.score ?? 0;
    }
    return row;
  });

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis
            dataKey="theme"
            tick={{ fontSize: 12, fill: "var(--muted)" }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted)" }} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--border)",
              fontSize: 12,
            }}
            formatter={(value, key) => {
              const item = series.find((s) => s.id === key);
              return [`${value}/100`, item?.name ?? key];
            }}
            labelFormatter={(label) => label}
          />
          {series.map((item) => (
            <Radar
              key={item.id}
              name={item.name}
              dataKey={item.id}
              stroke={item.color}
              fill={item.color}
              fillOpacity={0.25}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
