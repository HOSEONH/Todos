import Link from "next/link";

import LogoLarge from "../../public/images/logo/large.svg";
import LogoSmall from "../../public/images/logo/small.svg";

interface HeaderProps {
  iconSize?: number;
}

export default function Header({}: HeaderProps) {
  return (
    <div className="relative w-[1920px] h-[60px] bg-white border-b border-slate-200">
      {/* 태블릿 및 웹 크기에서 표시될 로고 */}
      <div
        className="absolute top-[10px] left-6
      tablet:left-[360px] hidden mobile:block
      "
      >
        <Link href="/">
          <LogoLarge width={151} height={40} />
        </Link>
      </div>

      {/* 모바일 크기에서 표시될 로고 */}
      <div className="absolute top-[9.71px] left-4 block mobile:hidden">
        <Link href="/">
          <LogoSmall width={71} height={40} />
        </Link>
      </div>
    </div>
  );
}
