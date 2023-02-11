const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json(),
  );
}

export function fetchCoinTickers(coinId: string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json(),
  );
}

export function fetchCoinHistory(coinId: string | undefined) {
  // js는 밀리세컨드를 제공하므로 1000으로 나눠서 초단위로 바꿈
  // floor은 숫자를 내림해줌, ceil은 올림해줌
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    // 원래 이거ㅠㅠ
    // `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`,
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`,
  ).then((response) => response.json());
}
