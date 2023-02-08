import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: #16453e;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  a {
    transition: color 0.2s ease-in-out;
    display: flex;
    align-items: center;
  }
  :hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 20px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-weight: 700;
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  // []를 붙였으니 한번만 실행되라고 명령
  useEffect(() => {
    // ()(); 이렇게 실행하면 바로 실행할 수 있다(실행하라고 명령 따로 안해도!)
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      // 100개의 코인만 가져오거라
      setCoins(json.slice(0, 50));
      // loading상태를 철회하고 화면을 띄움
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>COINS</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {/* coins array각각에 수행. */}
          {coins.map((coin) => (
            <Coin key={coin.id}>
              {/* string만 전달하는 방법 */}
              {/* <Link to={`/${coin.id}`}>  */}

              {/* Link를 사용해 화면 간 데이터 전달 가능(behind the scene) */}
              {/* state, pathname, hash, search 보낼 수 있음 */}
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  alt=""
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
