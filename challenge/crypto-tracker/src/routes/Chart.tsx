import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    },
  );
  const isDark = useRecoilValue(isDarkAtom);

  console.log(data);
  return (
    <div>
      {isLoading ? (
        <Loader>Loading chart...</Loader>
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data: data?.map((price) => [
                new Date(price.time_open).getTime(),
                Number(price.open) > 100
                  ? Number(price.open).toFixed(0)
                  : Number(price.open).toFixed(6),
                Number(price.high) > 100
                  ? Number(price.high).toFixed(0)
                  : Number(price.high).toFixed(6),
                Number(price.low) > 100
                  ? Number(price.low).toFixed(0)
                  : Number(price.low).toFixed(6),
                Number(price.close) > 100
                  ? Number(price.close).toFixed(0)
                  : Number(price.close).toFixed(6),
              ]),
            } as any,
          ]}
          options={{
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#DF7D46",
                  downward: "#3C90EB",
                },
              },
            },
            chart: {
              height: 500,
              width: 500,
              background: "transparent",
            },
            labels: ["aaa", "bbb", "ccc", "ddd"],
            yaxis: {
              labels: {
                show: false,
                formatter: (value) =>
                  value > 100 ? `$${value.toFixed(0)}` : `$${value.toFixed(6)}`,
              },
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: "datetime",
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
            },
            theme: {
              mode: isDark ? "dark" : "light",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
