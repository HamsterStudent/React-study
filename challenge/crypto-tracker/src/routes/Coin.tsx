import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  // useRouteMatch는 특정 페이지에 있는지 여부를 알려줌
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-weight: 700;
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.accentColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(255, 188, 100, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

// 인터페이스 이름 앞에 대문자 I를 붙이곤 함
// 아이디 : 관리자모드 - 전역 변수로 저장 - Object.keys(temp1).join() - 복사 붙여넣기
// 타입 : 관리자모드 - 전역 변수로 저장 - Object.values(temp1).map(v=> typeof v).join() - 복사 붙여넣기
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  // object라는 타입이 있을 때에는 관리자에서 찾아서 따로 인터페이스를 만들어 줘야 한다
  tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

// shift + alt + 오른쪽화살표
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    ath_date: string;
    ath_price: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_from_price_ath: number;
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  // useLocation : Link to 로 보낸 데이터 받아오기
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  console.log(chartMatch);

  useEffect(() => {
    // (async () => {
    //   const response = await fetch(
    //     `https://api.coinpaprika.com/v1/coins/${coinId}`,
    //   );
    //   const json = await response.json();
    // })();

    // 위의 두줄짜리 코드를 한줄로 합침
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log(infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceData);
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
    // hook은 최선의 성능을 위해 hook 안에서 사용한 것은 그게 어떤 것이든 이 안에 dependency를 넣어야 한다고 경고
    // 넣든안넣든 노상관. 불변하는 속성을 넣어야한다!!
  }, [coinId]);
  return (
    <Container>
      <Header>
        {/* coins에 진입하지 않고 페이지로 이동하면 state를 못받아오기 때문에 버그 발생. */}
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/price`}>
              {/* 이렇게 해도 작동함 */}
              {/* <Route path={`/:coinId/price`}> */}
              <Price />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
