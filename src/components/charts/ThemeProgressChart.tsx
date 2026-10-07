"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ThemeProgress } from "@/lib/types";
import { THEME_MAP } from "@/lib/themes";

interface Row {
  year: number;
  [key: string]: number;
}

export default function ThemeProgressChart({
  progress,
}: {
  progress: ThemeProgress[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const years = progress[0]?.points.map((point) => point.year) ?? [];
  const rows: Row[] = years.map((year) => {
    const row: Row = { year };
    for (const series of progress) {
      const value = series.points.find((point) => point.year === year)?.value ?? 0;
      row[series.theme] = value;
    }
    return row;
  });

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
            selected === null
              ? "border-brand bg-brand-soft text-brand-strong"
              : "border-border text-muted hover:border-brand"
          }`}
        >
          Todos
        </button>
        {progress.map((series) => (
          <button
            key={series.theme}
            type="button"
            onClick={() => setSelected(series.theme)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              selected === series.theme
                ? "border-brand bg-brand-soft text-brand-strong"
                : "border-border text-muted hover:border-brand"
            }`}
          >
            {THEME_MAP[series.theme].icon} {THEME_MAP[series.theme].short}
          </button>
        ))}
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="year" tick={{ fontSize: 12, fill: "var(--muted)" }} />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: "var(--muted)" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                fontSize: 12,
              }}
              formatter={(value, key) => [
                `${value}/100`,
                THEME_MAP[key as keyof typeof THEME_MAP].label,
              ]}
              labelFormatter={(label) => `Ano ${label}`}
            />
            {progress.map((series) => (
              <Line
                key={series.theme}
                type="monotone"
                dataKey={series.theme}
                name={series.theme}
                stroke={THEME_MAP[series.theme].color}
                strokeWidth={selected === series.theme ? 3 : 1.6}
                opacity={selected && selected !== series.theme ? 0.12 : 1}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
