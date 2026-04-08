"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FileText,
  ClipboardCheck,
  CalendarClock,
  ShieldCheck,
  Map as MapIcon,
  Building2,
  Factory,
  Hotel,
  ChevronDown,
  Plus,
  Minus
} from "lucide-react";

const NAV_SECTIONS = [
  { id: "problem", label: "課題", num: "01" },
  { id: "service", label: "業務内容", num: "02" },
  { id: "service_area", label: "対応エリア", num: "03" },
  { id: "strength", label: "選ばれる理由", num: "04" },
  { id: "price", label: "料金", num: "05" },
  { id: "flow", label: "ご依頼の流れ", num: "06" },
  { id: "faq", label: "Q&A", num: "07" },
  { id: "cta_contact", label: "お問い合わせ", num: "08" }
];

const PROBLEMS = [
  {
    title: "申請書類が膨大で本業を圧迫している",
    body:
      "在留資格認定証明書交付申請ひとつで添付書類は十数種類。宿泊や製造の現場で人手が削られている中、人事担当が深夜に書式を埋めている状態が常態化しています。"
  },
  {
    title: "在留資格更新の期限管理が属人化している",
    body:
      "外国人スタッフの在留期限が担当者の手帳とエクセルにしか無く、退職や異動のたびに『誰の更新がいつだったか』が宙に浮きます。1 件の失念が出入国在留管理局からの是正対象になります。"
  },
  {
    title: "定期報告書の不備で再提出を繰り返している",
    body:
      "特定技能や技能実習に伴う四半期報告・年次報告の様式は頻繁に改訂されます。古い様式のまま提出して差戻され、結局二度手間になっている宿泊業・製造業の事例は霧島市内だけでも珍しくありません。"
  },
  {
    title: "霧島市で相談できる行政書士がそもそも少ない",
    body:
      "鹿児島市まで往復するか、ウェブだけのやり取りで済ませるか。霧島市に拠点を持ち、現地のホテルや工場まで足を運んで状況を見たうえで申請ができる行政書士は限られています。"
  },
  {
    title: "在留資格の種類ごとの実務差を社内で整理しきれない",
    body:
      "特定技能 1 号と技能実習 2 号、技術・人文知識・国際業務、それぞれで揃えるべき書類も期限も異なります。社内で『どれが誰の在留資格か』を一覧化できないと、毎回の更新が手探りになります。"
  },
  {
    title: "万が一の不許可・再申請への備えがない",
    body:
      "不交付通知が届いた瞬間から、再申請までの猶予は限られています。事前に想定問答と補強資料を準備しておかないと、外国人スタッフの就労が止まり、宿泊・製造の現場が回らなくなります。"
  }
];

const SERVICES = [
  {
    icon: FileText,
    title: "在留資格認定証明書交付申請",
    body:
      "海外から新規に外国人スタッフを受け入れる際の入口となる申請です。雇用契約書・受入れ計画・賃金体系など事業者側の書類を、宿泊業・製造業それぞれの実務に合わせて整え、申請取次まで一貫して代行します。"
  },
  {
    icon: ClipboardCheck,
    title: "在留期間更新許可申請",
    body:
      "在留期限の 3 ヶ月前から準備に入ります。直近の業務内容・収入実績・税務関係書類を整理し、期限切れを発生させないよう更新時期から逆算したスケジュールで進めます。"
  },
  {
    icon: ShieldCheck,
    title: "在留資格変更許可申請",
    body:
      "技能実習から特定技能 1 号への移行、留学から技人国への変更など、在留資格カテゴリをまたぐ申請です。要件確認・立証資料の収集・申請書一式の作成までをまとめて引き受けます。"
  },
  {
    icon: Building2,
    title: "資格外活動許可申請",
    body:
      "本来の在留資格の活動範囲を超えた就労が必要になる場合の許可申請です。アルバイト時間管理や副業の取り扱いなど、宿泊現場の繁忙期を支える制度面のサポートを行います。"
  },
  {
    icon: CalendarClock,
    title: "各種定期届出・報告書類",
    body:
      "特定技能の四半期報告、技能実習の監理・指導記録、随時届出 (氏名変更・所属機関変更等) を、最新様式に追従した形で代行します。不備での差戻しを発生させないことを最優先に運用します。"
  },
  {
    icon: Factory,
    title: "受入れ計画書 / 社内体制整備",
    body:
      "特定技能の受入れ計画書、支援計画書、社内規程の整備までを含めた『はじめての外国人雇用』対応も承ります。製造業の工程表や宿泊業のシフト体制と整合させた書面に仕上げます。"
  }
];

const STRENGTHS = [
  {
    num: "01",
    title: "霧島市と周辺の産業構造を理解した地域特化",
    body:
      "霧島市・姶良市・湧水町に拠点を構えるホテル、温泉旅館、食品加工、機械部品の現場を念頭に置いて書類を組み立てます。雇用契約書ひとつでも、地域の最低賃金・通勤実態・宿舎事情が反映されます。",
    sub:
      "現地訪問の機動力と、地元の事業環境への理解は、東京や福岡の遠隔事務所には作れない差別化ポイントです。"
  },
  {
    num: "02",
    title: "宿泊業・製造業の在留資格パターンに精通",
    body:
      "特定技能 (宿泊 / 飲食料品製造業 / 産業機械製造業)、技能実習、技術・人文知識・国際業務など、宿泊と製造で頻出する在留資格カテゴリの実務を蓄積しています。書類設計の段階で『どこで止まりやすいか』を先回りします。",
    sub:
      "業種ごとの典型書式をテンプレ運用するのではなく、貴社の業務実態に合わせて毎回組み直します。"
  },
  {
    num: "03",
    title: "顧問契約による継続サポートで更新期限を一括管理",
    body:
      "顧問契約をご利用いただくと、在留期限・定期報告期限・契約更新時期を当事務所側の管理表で一括追跡します。担当者の異動や退職があっても、更新が宙に浮くことがなくなります。",
    sub:
      "毎回の単発依頼を積み上げる運用から、年間スケジュールとして外注する運用に切り替えることで、人事担当者は本業に集中できます。"
  }
];

const PRICE_PLANS = [
  {
    num: "01",
    name: "顧問契約 (継続サポート)",
    target: "外国人スタッフを継続的に雇用している宿泊業・製造業向け",
    items: [
      "月次の在留資格・期限管理",
      "定期報告書類の作成と申請取次",
      "メール / 電話での随時相談 (回数無制限)",
      "現地訪問対応 (月 1 回目安)",
      "新規受入れ時の追加書類対応"
    ],
    price: "料金についてはお問い合わせください"
  },
  {
    num: "02",
    name: "単発代行 (書類種別ごと)",
    target: "特定の申請のみをスポットで依頼したい事業者向け",
    items: [
      "在留資格認定証明書交付申請",
      "在留期間更新許可申請",
      "在留資格変更許可申請",
      "資格外活動許可申請",
      "定期届出 / 随時届出 単発対応"
    ],
    price: "料金についてはお問い合わせください"
  }
];

const FLOW = [
  {
    num: "01",
    title: "お問い合わせ",
    body:
      "下部のフォーム、または営業時間内のお電話にて、対象となる外国人スタッフの人数と現在の在留資格状況を簡単にお知らせください。",
    days: "目安: 当日中に一次返信"
  },
  {
    num: "02",
    title: "ヒアリング",
    body:
      "オンライン面談または現地訪問にて、雇用契約の状況、在留資格の種類、これまでの申請履歴、社内の管理体制を詳しくお聞きします。霧島市内・近隣はご訪問にて対応します。",
    days: "目安: 1 回 60〜90 分"
  },
  {
    num: "03",
    title: "お見積り・契約",
    body:
      "ヒアリング内容にもとづき、顧問契約か単発代行かをご提案し、対応書類と料金を明示したお見積りをお出しします。ご納得いただいたうえでの契約のみ進めます。",
    days: "目安: ヒアリングから 3 営業日以内"
  },
  {
    num: "04",
    title: "書類作成・申請取次",
    body:
      "必要書類の収集、書面作成、出入国在留管理局への申請取次までを当事務所が代行します。進捗は逐次共有し、追加書類が必要になった際もこちらから事前にご案内します。",
    days: "目安: 案件種別により 2〜6 週間"
  }
];

const FAQS = [
  {
    q: "顧問契約と単発代行は、どちらを選べばよいですか",
    a:
      "外国人スタッフを 3 名以上継続的に雇用されている、または年に複数回の更新・定期報告が発生している事業者様には、顧問契約をおすすめしています。逆に、新規 1 件のみの申請や、特定の更新だけをお願いしたい場合は単発代行で問題ありません。ヒアリング時にご状況を伺ったうえで、無理のない選び方をご提案します。"
  },
  {
    q: "霧島市以外でも対応してもらえますか",
    a:
      "鹿児島県霧島市を中心に、姶良市・湧水町・鹿児島市北部までは現地訪問にて対応しています。それ以外の地域については、オンライン面談と書類のやり取りでの対応となります。お問い合わせ時にご所在地をお知らせください。"
  },
  {
    q: "初めての外国人雇用ですが、相談できますか",
    a:
      "もちろん可能です。はじめての受入れの場合、就労が認められる在留資格の確認、雇用契約書の整備、社内の受入れ体制づくりから順を追ってご説明します。特定技能の支援計画書や受入れ計画書を整えるところから一緒に進めます。"
  },
  {
    q: "在留資格の更新を忘れていたことに気づきました。どうすればよいですか",
    a:
      "まずは在留期限と現状をご連絡ください。期限超過の状況によっては、在留特別許可申請や、本人の出国・再入国を含む対応が必要になる場合もあります。状況によって取り得る選択肢をお伝えしますので、自己判断で動かれる前にご相談ください。"
  },
  {
    q: "相談だけでも大丈夫ですか",
    a:
      "はい、初回の状況確認のご相談は無料で承っております。『この在留資格でこの業務はできるのか』『このタイミングでこの書類は必要か』といった単発のご質問だけでも構いません。"
  },
  {
    q: "料金は何で決まりますか",
    a:
      "申請の種類、対象となる外国人スタッフの人数、在留資格カテゴリの複雑さ、添付書類の収集難易度を基準にお見積りします。顧問契約の場合は対応範囲と頻度から月額をご提案します。料金の詳細はヒアリング後に個別に明示いたしますのでご安心ください。"
  },
  {
    q: "顧問契約を結ぶと、毎月必ず訪問してもらえますか",
    a:
      "標準プランでは月 1 回程度の現地訪問を目安としていますが、繁忙期や受入れ拡大時期に合わせて頻度を調整することも可能です。逆に閑散期はオンライン中心で運用するなど、貴社のリズムに合わせて柔軟に組み立てます。"
  }
];

export default function LandingPage() {
  return (
    <main className="bg-ivory text-ink">
      <SiteHeader />
      <Hero />
      <Problem />
      <Service />
      <ServiceArea />
      <Strength />
      <Price />
      <Flow />
      <FAQ />
      <ContactCTA />
      <SiteFooter />
    </main>
  );
}

/* ---------------- Header ---------------- */

function SiteHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12 py-6 flex items-center justify-between">
        <a href="#hero" className="block text-ivory">
          <span className="block font-serif text-base md:text-lg leading-tight tracking-wide">
            合同会社LHジャパン
          </span>
          <span className="block font-num text-[10px] md:text-xs tracking-[0.2em] text-ivory/70 mt-0.5">
            LH JAPAN — KIRISHIMA
          </span>
        </a>
        <a
          href="#cta_contact"
          className="hidden md:inline-flex items-center gap-2 border border-ivory/60 px-5 py-2 text-sm text-ivory hover:bg-ivory hover:text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ivory"
        >
          <span className="font-num text-[10px] tracking-[0.2em]">CONTACT</span>
          <span>無料で書類診断を依頼する</span>
        </a>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section
      data-section="hero"
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[750px] md:min-h-[820px] bg-navy text-ivory overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.svg"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-12 pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-7 relative pl-6 md:pl-10 border-l border-ivory/40">
            <p className="font-num text-[11px] md:text-xs tracking-[0.3em] text-ivory/70 mb-6">
              KIRISHIMA — IMMIGRATION DOCUMENT AGENCY
            </p>
            <h1
              id="hero-heading"
              className="font-serif font-black text-[34px] leading-[1.2] md:text-[56px] md:leading-[1.18] tracking-[0.01em]"
            >
              外国人雇用の書類負担を、<br />
              霧島で、ゼロに。
            </h1>
            <p className="mt-8 md:mt-10 text-[15px] md:text-[17px] text-ivory/85 max-w-xl leading-[1.95]">
              鹿児島県霧島市の宿泊業・製造業に特化した行政書士事務所です。在留資格認定証明書交付申請から、在留期間更新、定期報告書類の作成、そして顧問契約による継続的な期限管理まで。入管取次に対応した実務家が、貴社の人事担当者の負担を肩代わりします。
            </p>
            <ul className="mt-8 md:mt-10 grid gap-3 text-[13px] md:text-[15px] text-ivory/80">
              <li className="flex items-baseline gap-3">
                <span className="font-num text-ember text-xs">◆</span>
                <span>霧島市・姶良市・湧水町への現地訪問対応</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="font-num text-ember text-xs">◆</span>
                <span>宿泊業・製造業の在留資格パターンに精通</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="font-num text-ember text-xs">◆</span>
                <span>顧問契約で在留期限・定期報告を一括管理</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5 relative">
            <div className="hidden md:block relative h-[440px] mt-2">
              <Image
                src="/images/hero-key.svg"
                alt="霧島市の山並みを背景にした書類作業のイメージ"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-0 md:absolute md:right-12 md:bottom-16 md:max-w-sm">
          <a
            href="#cta_contact"
            className="group block bg-ember text-ivory px-7 py-5 md:px-8 md:py-6 shadow-[3px_5px_0px_rgba(0,0,0,0.25)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_3px_0px_rgba(0,0,0,0.25)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ivory"
          >
            <span className="block font-num text-[10px] tracking-[0.25em] text-ivory/80">
              FREE DIAGNOSIS — 初回相談無料
            </span>
            <span className="block mt-2 font-serif text-lg md:text-xl leading-snug">
              無料で書類診断を依頼する
            </span>
            <span className="block mt-2 text-xs md:text-[13px] text-ivory/85 leading-relaxed">
              在留資格の状況をお伺いし、貴社に必要な書類と更新スケジュールをその場でお伝えします。
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Problem ---------------- */

function Problem() {
  return (
    <section
      data-section="problem"
      id="problem"
      aria-labelledby="problem-heading"
      className="bg-ivory py-24 md:py-[120px] relative"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <p className="font-num text-xs tracking-[0.28em] text-ember mb-5">01 — PROBLEM</p>
            <h2
              id="problem-heading"
              className="font-serif text-[28px] md:text-[40px] leading-[1.25] border-l-4 border-ember pl-5"
            >
              外国人雇用の現場で、<br />
              止まっている書類は、<br />
              ありませんか。
            </h2>
            <p className="mt-6 text-[14px] md:text-[15px] text-ink/75 max-w-md">
              霧島市の宿泊・製造の現場で人事担当者から実際にいただく相談を、6 つの典型として整理しました。1 つでも当てはまるなら、書類運用そのものを外部化する余地があります。
            </p>
            <div className="mt-10 relative w-full aspect-[4/5] max-w-[300px] border border-ink/20">
              <Image
                src="/images/problem-figure.svg"
                alt="深夜に書類を整理する人事担当者のイメージ"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <ul className="grid md:grid-cols-2 gap-x-10 gap-y-10">
              {PROBLEMS.map((p, i) => (
                <li key={p.title} className="border-t border-ink/15 pt-5">
                  <div className="flex items-baseline gap-4">
                    <span className="font-num text-xs text-ember tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-[17px] md:text-[19px] leading-snug">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[13px] md:text-[14.5px] text-ink/75 leading-[1.9]">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Service ---------------- */

function Service() {
  return (
    <section
      data-section="service"
      id="service"
      aria-labelledby="service-heading"
      className="bg-navy text-ivory py-24 md:py-[130px] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Image src="/images/service-bg.svg" alt="" fill aria-hidden="true" className="object-cover" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 mb-14 md:mb-20">
          <div className="md:col-span-5">
            <p className="font-num text-xs tracking-[0.28em] text-ember mb-5">02 — SERVICE</p>
            <h2
              id="service-heading"
              className="font-serif text-[28px] md:text-[42px] leading-[1.22] border-l-4 border-ember pl-5"
            >
              入国管理取次と<br />
              書類作成代行を、<br />
              一貫して。
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-8">
            <p className="text-[14px] md:text-[16px] text-ivory/80 leading-[1.95] max-w-2xl">
              在留資格認定証明書交付申請を入口に、在留期間更新、在留資格変更、資格外活動許可、各種定期届出、受入れ計画書の作成までを当事務所がまとめて引き受けます。宿泊業と製造業に特化していることで、書類設計の段階から実態に合わせた書面が組めます。顧問契約と単発代行の 2 つの契約形態をご用意しています。
            </p>
          </div>
        </div>

        <ul className="grid md:grid-cols-12 gap-x-8 gap-y-10">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const span = i % 3 === 0 ? "md:col-span-6" : "md:col-span-3";
            return (
              <li
                key={s.title}
                className={`${span} border-t border-ivory/25 pt-6 md:pt-7`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-num text-[11px] tracking-[0.2em] text-ivory/55">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="w-4 h-4 text-ember" aria-hidden="true" />
                </div>
                <h3 className="mt-3 font-serif text-[18px] md:text-[20px] leading-snug">
                  {s.title}
                </h3>
                <p className="mt-3 text-[13px] md:text-[14.5px] text-ivory/80 leading-[1.9]">
                  {s.body}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 md:mt-20 grid md:grid-cols-12 gap-8 border-t border-ivory/25 pt-10">
          <div className="md:col-span-4">
            <p className="font-num text-[11px] tracking-[0.25em] text-ember">CONTRACT TYPES</p>
            <h3 className="mt-2 font-serif text-[22px] md:text-[26px]">2 つの契約形態</h3>
          </div>
          <div className="md:col-span-4">
            <p className="font-serif text-[18px] md:text-[20px]">顧問契約</p>
            <p className="mt-3 text-[13px] md:text-[14.5px] text-ivory/80 leading-[1.9]">
              在留期限・定期報告・社内体制まで、年間を通して当事務所が継続管理します。担当者が変わっても申請が途切れません。
            </p>
          </div>
          <div className="md:col-span-4">
            <p className="font-serif text-[18px] md:text-[20px]">単発代行</p>
            <p className="mt-3 text-[13px] md:text-[14.5px] text-ivory/80 leading-[1.9]">
              特定の申請だけ、特定の更新だけ。スポットで安心して任せたい事業者様向けの契約形態です。書類種別ごとに見積りします。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Service Area ---------------- */

function ServiceArea() {
  return (
    <section
      data-section="service_area"
      id="service_area"
      aria-labelledby="area-heading"
      className="bg-ivory py-24 md:py-[120px] relative"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5">
            <p className="font-num text-xs tracking-[0.28em] text-ember mb-5">03 — SERVICE AREA</p>
            <h2
              id="area-heading"
              className="font-serif text-[28px] md:text-[40px] leading-[1.25] border-l-4 border-ember pl-5"
            >
              鹿児島県霧島市を、<br />
              本拠地として。
            </h2>
            <p className="mt-6 text-[14px] md:text-[15px] text-ink/75 leading-[1.95] max-w-md">
              霧島市の事業環境、宿泊業の繁忙期リズム、製造業の交代勤務体制まで把握したうえで対応します。現地訪問を前提とした地域特化と、オンライン面談での全国対応の 2 軸で運営しています。
            </p>

            <dl className="mt-10 border-t border-ink/20">
              <div className="grid grid-cols-12 border-b border-ink/15 py-4">
                <dt className="col-span-4 font-num text-[11px] tracking-[0.2em] text-ink/60 pt-1">
                  ONSITE
                </dt>
                <dd className="col-span-8 text-[14px] md:text-[15px] leading-relaxed">
                  鹿児島県霧島市 / 姶良市 / 湧水町 / 鹿児島市北部
                  <span className="block text-[12px] text-ink/60 mt-1">
                    現地訪問にてヒアリング・打合せを行います
                  </span>
                </dd>
              </div>
              <div className="grid grid-cols-12 border-b border-ink/15 py-4">
                <dt className="col-span-4 font-num text-[11px] tracking-[0.2em] text-ink/60 pt-1">
                  ONLINE
                </dt>
                <dd className="col-span-8 text-[14px] md:text-[15px] leading-relaxed">
                  全国対応 (Zoom / Google Meet)
                  <span className="block text-[12px] text-ink/60 mt-1">
                    遠方の事業者様もオンラインで対応可能です
                  </span>
                </dd>
              </div>
              <div className="grid grid-cols-12 py-4">
                <dt className="col-span-4 font-num text-[11px] tracking-[0.2em] text-ink/60 pt-1">
                  INDUSTRY
                </dt>
                <dd className="col-span-8 text-[14px] md:text-[15px] leading-relaxed">
                  宿泊業 / 飲食料品製造業 / 産業機械製造業 / 食品加工
                  <span className="block text-[12px] text-ink/60 mt-1">
                    霧島市内の典型的な受入れ業種に注力しています
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-7 relative">
            <div className="relative w-full aspect-[4/3] border border-ink/20">
              <Image
                src="/images/area-map.svg"
                alt="鹿児島県霧島市と周辺市町 (姶良市・湧水町・鹿児島市北部) の対応エリア概略図"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-[11px] font-num tracking-[0.18em] text-ink/55">
              FIG. KIRISHIMA &amp; SURROUNDING MUNICIPALITIES
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Strength ---------------- */

function Strength() {
  return (
    <section
      data-section="strength"
      id="strength"
      aria-labelledby="strength-heading"
      className="bg-navy text-ivory py-24 md:py-[130px] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <Image src="/images/strength-bg.svg" alt="" fill aria-hidden="true" className="object-cover" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5">
            <p className="font-num text-xs tracking-[0.28em] text-ember mb-5">04 — STRENGTH</p>
            <h2
              id="strength-heading"
              className="font-serif text-[28px] md:text-[42px] leading-[1.22] border-l-4 border-ember pl-5"
            >
              選ばれる、<br />
              三つの理由。
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-8">
            <p className="text-[14px] md:text-[16px] text-ivory/80 leading-[1.95] max-w-2xl">
              地方に拠点を置く行政書士事務所はいくつもあります。その中で当事務所が選ばれている理由は、霧島市という地域、宿泊業・製造業という業種、そして顧問契約という継続のかたち、その三つを掛け合わせている点にあります。
            </p>
          </div>
        </div>

        <ol className="space-y-10 md:space-y-14">
          {STRENGTHS.map((s) => (
            <li key={s.num} className="grid md:grid-cols-12 gap-6 md:gap-10 border-t border-ivory/25 pt-8 md:pt-10">
              <div className="md:col-span-3">
                <span className="font-num text-[44px] md:text-[64px] font-bold text-ember leading-none">
                  {s.num}
                </span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-serif text-[20px] md:text-[26px] leading-snug">
                  {s.title}
                </h3>
                <p className="mt-4 text-[14px] md:text-[15.5px] text-ivory/85 leading-[1.95]">
                  {s.body}
                </p>
                <p className="mt-3 text-[13px] md:text-[14px] text-ivory/65 leading-[1.9] border-l border-ivory/30 pl-4">
                  {s.sub}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 text-right">
          <a
            href="#cta_contact"
            className="inline-block bg-ember text-ivory px-8 py-5 shadow-[3px_5px_0px_rgba(0,0,0,0.25)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_3px_0px_rgba(0,0,0,0.25)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ivory"
          >
            <span className="font-serif text-[17px] md:text-[19px]">
              無料で書類診断を依頼する
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Price ---------------- */

function Price() {
  return (
    <section
      data-section="price"
      id="price"
      aria-labelledby="price-heading"
      className="bg-ivory py-24 md:py-[120px] relative"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5">
            <p className="font-num text-xs tracking-[0.28em] text-ember mb-5">05 — PRICE</p>
            <h2
              id="price-heading"
              className="font-serif text-[28px] md:text-[42px] leading-[1.22] border-l-4 border-ember pl-5"
            >
              二つの契約形態と、<br />
              その内訳。
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-8">
            <p className="text-[14px] md:text-[16px] text-ink/75 leading-[1.95] max-w-2xl">
              料金は対象人数・在留資格カテゴリ・対応範囲によって変動するため、詳細はヒアリング後に個別にご提示します。ここでは、二つの契約形態それぞれに含まれる内容を一覧でご確認いただけます。
            </p>
          </div>
        </div>

        <div className="border-t-2 border-ink/80">
          {PRICE_PLANS.map((plan) => (
            <div
              key={plan.name}
              className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-b border-ink/30"
            >
              <div className="md:col-span-3">
                <span className="font-num text-[34px] md:text-[44px] text-ember font-bold leading-none">
                  {plan.num}
                </span>
                <h3 className="mt-3 font-serif text-[20px] md:text-[24px] leading-snug">
                  {plan.name}
                </h3>
                <p className="mt-2 text-[12px] md:text-[13px] text-ink/65 leading-relaxed">
                  {plan.target}
                </p>
              </div>
              <div className="md:col-span-6">
                <p className="font-num text-[10px] tracking-[0.22em] text-ink/55 mb-3">
                  含まれる内容
                </p>
                <ul className="space-y-2.5">
                  {plan.items.map((item) => (
                    <li
                      key={item}
                      className="text-[13px] md:text-[14.5px] text-ink/85 border-b border-dashed border-ink/15 pb-2 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-3">
                <p className="font-num text-[10px] tracking-[0.22em] text-ink/55 mb-3">
                  料金
                </p>
                <p className="font-serif text-[16px] md:text-[18px] text-ink leading-snug">
                  {plan.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[12px] md:text-[13px] text-ink/60 leading-relaxed">
          ※ 行政書士報酬とは別に、申請手数料 (法定費用) 、収入印紙代、翻訳費用等の実費が発生する場合があります。お見積り時に併せてご案内します。
        </p>

        <div className="mt-12 text-right">
          <a
            href="#cta_contact"
            className="inline-block bg-ember text-ivory px-8 py-5 shadow-[3px_5px_0px_rgba(0,0,0,0.25)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_3px_0px_rgba(0,0,0,0.25)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ember"
          >
            <span className="font-serif text-[17px] md:text-[19px]">
              無料で書類診断を依頼する
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Flow ---------------- */

function Flow() {
  return (
    <section
      data-section="flow"
      id="flow"
      aria-labelledby="flow-heading"
      className="bg-navy text-ivory py-24 md:py-[130px] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image src="/images/flow-bg.svg" alt="" fill aria-hidden="true" className="object-cover" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5">
            <p className="font-num text-xs tracking-[0.28em] text-ember mb-5">06 — FLOW</p>
            <h2
              id="flow-heading"
              className="font-serif text-[28px] md:text-[42px] leading-[1.22] border-l-4 border-ember pl-5"
            >
              ご依頼から申請取次まで、<br />
              四つのステップ。
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-8">
            <p className="text-[14px] md:text-[16px] text-ivory/80 leading-[1.95] max-w-2xl">
              はじめてご相談いただく事業者様にも、進捗が見える流れでご案内します。現状確認から申請取次まで、各段階で『次に何が起きるか』を必ず事前にお伝えします。
            </p>
          </div>
        </div>

        <ol className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {FLOW.map((f) => (
            <li key={f.num} className="grid grid-cols-12 gap-4 border-t border-ivory/25 pt-6">
              <div className="col-span-3 md:col-span-2">
                <span className="font-num text-[40px] md:text-[52px] text-ember font-bold leading-none">
                  {f.num}
                </span>
              </div>
              <div className="col-span-9 md:col-span-10">
                <h3 className="font-serif text-[19px] md:text-[22px] leading-snug">
                  {f.title}
                </h3>
                <p className="mt-3 text-[13px] md:text-[14.5px] text-ivory/85 leading-[1.95]">
                  {f.body}
                </p>
                <p className="mt-3 font-num text-[11px] md:text-[12px] tracking-[0.15em] text-ivory/60">
                  {f.days}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      data-section="faq"
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-ivory py-24 md:py-[120px] relative"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <p className="font-num text-xs tracking-[0.28em] text-ember mb-5">07 — Q &amp; A</p>
            <h2
              id="faq-heading"
              className="font-serif text-[28px] md:text-[40px] leading-[1.25] border-l-4 border-ember pl-5"
            >
              よくある<br />ご質問。
            </h2>
            <p className="mt-6 text-[14px] md:text-[15px] text-ink/75 leading-[1.95] max-w-md">
              これまで霧島市内外の宿泊・製造の人事担当者の方からいただいた質問のうち、ご相談前に多く寄せられるものをまとめました。
            </p>
          </div>
          <div className="md:col-span-8">
            <ul className="border-t border-ink/30">
              {FAQS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q} className="border-b border-ink/20">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full text-left py-6 flex items-start gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ember"
                    >
                      <span className="font-num text-[12px] md:text-[13px] tracking-[0.2em] text-ember pt-1">
                        Q{String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-serif text-[15px] md:text-[18px] leading-snug">
                        {item.q}
                      </span>
                      <span className="pt-1 text-ember" aria-hidden="true">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-7 pl-[60px] pr-4">
                        <p className="text-[13px] md:text-[14.5px] text-ink/80 leading-[1.95]">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact CTA ---------------- */

function ContactCTA() {
  return (
    <section
      data-section="cta_contact"
      id="cta_contact"
      aria-labelledby="cta-heading"
      className="bg-navy text-ivory py-24 md:py-[140px] relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image src="/images/cta-bg.svg" alt="" fill aria-hidden="true" className="object-cover opacity-40" />
      </div>
      <div className="absolute inset-0 bg-navy/60" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1320px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="font-num text-xs tracking-[0.28em] text-ember mb-5">08 — CONTACT</p>
            <h2
              id="cta-heading"
              className="font-serif text-[28px] md:text-[44px] leading-[1.22] border-l-4 border-ember pl-5"
            >
              無料で、<br />
              書類診断を、<br />
              依頼する。
            </h2>
            <p className="mt-8 text-[14px] md:text-[15.5px] text-ivory/85 leading-[1.95] max-w-md">
              対象となる外国人スタッフの人数と、現在の在留資格状況だけお知らせください。貴社に必要な書類と更新スケジュールを整理してご返信します。初回のご相談は無料です。
            </p>
            <dl className="mt-10 border-t border-ivory/30">
              <div className="grid grid-cols-12 border-b border-ivory/20 py-4">
                <dt className="col-span-4 font-num text-[11px] tracking-[0.2em] text-ivory/60 pt-1">
                  COMPANY
                </dt>
                <dd className="col-span-8 text-[14px] md:text-[15px]">
                  合同会社LHジャパン
                </dd>
              </div>
              <div className="grid grid-cols-12 border-b border-ivory/20 py-4">
                <dt className="col-span-4 font-num text-[11px] tracking-[0.2em] text-ivory/60 pt-1">
                  AREA
                </dt>
                <dd className="col-span-8 text-[14px] md:text-[15px]">
                  鹿児島県霧島市 および周辺地域
                </dd>
              </div>
              <div className="grid grid-cols-12 py-4">
                <dt className="col-span-4 font-num text-[11px] tracking-[0.2em] text-ivory/60 pt-1">
                  REPLY
                </dt>
                <dd className="col-span-8 text-[14px] md:text-[15px] leading-relaxed">
                  2 日以内に登録メールアドレス宛にご連絡させていただきます
                </dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-7">
            <form
              className="bg-ivory text-ink p-7 md:p-10 shadow-[4px_6px_0px_rgba(0,0,0,0.3)]"
              onSubmit={(e) => e.preventDefault()}
            >
              <p className="font-num text-[10px] tracking-[0.22em] text-ember mb-2">
                INQUIRY FORM
              </p>
              <p className="font-serif text-[16px] md:text-[18px] mb-6">
                書類診断のご依頼フォーム
              </p>

              <p className="text-[12px] md:text-[13px] text-ink/75 leading-[1.85] border border-ink/20 px-4 py-3 mb-6">
                ご入力いただいたメールアドレス宛に、2 日以内に当事務所よりご連絡させていただきます。営業日の都合により遅れる場合は別途ご案内します。
              </p>

              <div className="grid gap-5">
                <Field label="ご相談内容" htmlFor="inq-service" required>
                  <select
                    id="inq-service"
                    name="service"
                    className="w-full border-b border-ink/40 bg-transparent py-2 text-[14px] focus:outline-none focus:border-ember"
                  >
                    <option value="">選択してください</option>
                    <option value="komon">顧問契約について相談したい</option>
                    <option value="tanpatsu">単発の申請を依頼したい</option>
                    <option value="koushin">在留期間更新について相談したい</option>
                    <option value="hajimete">はじめての外国人雇用について相談したい</option>
                    <option value="other">その他</option>
                  </select>
                </Field>
                <Field label="貴社名" htmlFor="inq-company" required>
                  <input
                    id="inq-company"
                    name="company"
                    type="text"
                    placeholder="例: 株式会社霧島ホテル"
                    className="w-full border-b border-ink/40 bg-transparent py-2 text-[14px] focus:outline-none focus:border-ember"
                  />
                </Field>
                <Field label="ご担当者名" htmlFor="inq-name" required>
                  <input
                    id="inq-name"
                    name="name"
                    type="text"
                    placeholder="山田 太郎"
                    className="w-full border-b border-ink/40 bg-transparent py-2 text-[14px] focus:outline-none focus:border-ember"
                  />
                </Field>
                <Field label="メールアドレス" htmlFor="inq-email" required>
                  <input
                    id="inq-email"
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                    className="w-full border-b border-ink/40 bg-transparent py-2 text-[14px] focus:outline-none focus:border-ember"
                  />
                </Field>
                <Field label="お電話番号 (任意)" htmlFor="inq-tel">
                  <input
                    id="inq-tel"
                    name="tel"
                    type="tel"
                    placeholder="0995-12-3456"
                    className="w-full border-b border-ink/40 bg-transparent py-2 text-[14px] focus:outline-none focus:border-ember"
                  />
                </Field>
                <Field label="対象となる外国人スタッフの人数" htmlFor="inq-count">
                  <input
                    id="inq-count"
                    name="count"
                    type="text"
                    placeholder="例: 5 名 (特定技能 3 名・技能実習 2 名)"
                    className="w-full border-b border-ink/40 bg-transparent py-2 text-[14px] focus:outline-none focus:border-ember"
                  />
                </Field>
                <Field label="現在の在留資格状況・ご相談内容" htmlFor="inq-message">
                  <textarea
                    id="inq-message"
                    name="message"
                    rows={4}
                    placeholder="現在の在留資格、更新時期、これまでの申請履歴、お困りの点など、わかる範囲でお書きください"
                    className="w-full border border-ink/30 bg-transparent p-3 text-[14px] focus:outline-none focus:border-ember"
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="mt-8 w-full bg-ember text-ivory py-5 shadow-[3px_5px_0px_rgba(0,0,0,0.25)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_3px_0px_rgba(0,0,0,0.25)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ember"
              >
                <span className="font-serif text-[17px] md:text-[19px]">
                  無料で書類診断を依頼する
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block font-num text-[10px] tracking-[0.22em] text-ink/70 mb-1.5"
      >
        {label}
        {required && <span className="ml-2 text-ember">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ---------------- Footer ---------------- */

function SiteFooter() {
  return (
    <footer className="bg-navy text-ivory border-t border-ivory/20">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12 py-14 md:py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <p className="font-serif text-[20px] md:text-[24px]">合同会社LHジャパン</p>
            <p className="font-num text-[10px] tracking-[0.25em] text-ivory/60 mt-1">
              LH JAPAN — KIRISHIMA, KAGOSHIMA
            </p>
            <p className="mt-6 text-[13px] md:text-[14px] text-ivory/75 leading-[1.95] max-w-xl">
              鹿児島県霧島市の宿泊業・製造業に特化した行政書士事務所として、外国人雇用にまつわる入管書類の作成代行と顧問契約による継続支援をご提供しています。
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <a
              href="#cta_contact"
              className="inline-block bg-ember text-ivory px-7 py-4 shadow-[3px_5px_0px_rgba(0,0,0,0.25)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_3px_0px_rgba(0,0,0,0.25)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ivory"
            >
              <span className="font-serif text-[16px] md:text-[18px]">
                無料で書類診断を依頼する
              </span>
            </a>
            <p className="mt-6 font-num text-[10px] tracking-[0.22em] text-ivory/55">
              © {new Date().getFullYear()} GODO KAISHA LH JAPAN
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
