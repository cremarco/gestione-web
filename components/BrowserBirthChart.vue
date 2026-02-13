<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import { use } from 'echarts/core'
import { ScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

use([
  ScatterChart,
  GridComponent,
  TooltipComponent,
  CanvasRenderer,
])

interface BrowserBirthPoint {
  name: string
  year: number
  row: number
  color: string
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'
  labelOffset?: [number, number]
}

const points: BrowserBirthPoint[] = [
  { name: 'Opera', year: 1995, row: 5, color: '#d40000', labelPosition: 'right', labelOffset: [8, -2] },
  { name: 'Safari', year: 2003, row: 3, color: '#147efb', labelPosition: 'top' },
  { name: 'Firefox', year: 2004, row: 1, color: '#ff7139', labelPosition: 'bottom' },
  { name: 'Chrome', year: 2008, row: 5, color: '#34a853', labelPosition: 'top' },
  { name: 'Tor', year: 2008, row: 2, color: '#7e4798', labelPosition: 'bottom' },
  { name: 'Edge', year: 2015, row: 4, color: '#0ea5e9', labelPosition: 'top' },
  { name: 'Brave', year: 2016, row: 2, color: '#fb542b', labelPosition: 'bottom' },
  { name: 'Vivaldi', year: 2016, row: 5, color: '#ef3939', labelPosition: 'top' },
  { name: 'Arc', year: 2022, row: 4, color: '#111827', labelPosition: 'top' },
  { name: 'DuckDuckGo', year: 2022, row: 1, color: '#de5833', labelPosition: 'left', labelOffset: [-8, 2] },
]

const chartOption = computed<EChartsOption>(() => {
  return {
    animationDuration: 700,
    animationEasing: 'cubicOut',
    grid: {
      top: 26,
      right: 34,
      bottom: 52,
      left: 52,
      containLabel: false,
    },
    tooltip: {
      trigger: 'item',
      formatter(params) {
        const point = points[params.seriesIndex]
        return `${point.name}<br/>Nascita: ${point.year}`
      },
    },
    xAxis: {
      type: 'value',
      min: 1995,
      max: 2025,
      interval: 5,
      axisLine: {
        lineStyle: { color: 'rgba(15, 23, 42, 0.72)', width: 1.6 },
      },
      axisTick: {
        lineStyle: { color: 'rgba(15, 23, 42, 0.62)' },
      },
      axisLabel: {
        color: '#334155',
        fontSize: 12,
        fontWeight: 700,
      },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(15, 23, 42, 0.08)' },
      },
      name: 'Anno di nascita browser (asse X)',
      nameLocation: 'center',
      nameGap: 36,
      nameTextStyle: {
        color: '#334155',
        fontSize: 12,
        fontWeight: 800,
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 6,
      show: false,
      splitLine: { show: false },
    },
    series: points.map((point) => ({
      type: 'scatter',
      symbolSize: 14,
      data: [[point.year, point.row]],
      itemStyle: {
        color: point.color,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.92)',
      },
      label: {
        show: true,
        formatter: `${point.name} (${point.year})`,
        position: point.labelPosition ?? 'top',
        offset: point.labelOffset ?? [0, 0],
        color: '#0f172a',
        fontSize: 12,
        fontWeight: 700,
      },
      emphasis: {
        scale: 1.1,
      },
      z: 3,
    })),
  }
})
</script>

<template>
  <section class="card bg-base-100 border border-base-300 shadow-sm">
    <div class="card-body p-3">
    <VChart
      class="h-[17.4rem] w-full"
      :option="chartOption"
      autoresize
      aria-label="Asse temporale dei browser: anno di nascita per ciascun browser"
    />

    <p class="m-0 text-[0.62rem] leading-snug text-base-content/70">
      Grafico realizzato con libreria ECharts. I livelli verticali separano solo le etichette.
    </p>
    </div>
  </section>
</template>
