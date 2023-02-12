// import original module declarations
import "styled-components";

// typescript에서 styled componets를 쓰고 싶다면 .d.ts로 된 선언파일이 필요하다
// 타입은 이곳에서 설정하면 됨
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    cardBgColor: string;
  }
}
