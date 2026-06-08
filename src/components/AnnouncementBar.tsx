import { useLanguage } from "@/context/LanguageContext";

export const AnnouncementBar = () => {
  const { t } = useLanguage();

  const items = Array(2).fill([
    t("announcement.shipping"),
    t("announcement.materials"),
    t("announcement.customized"),
    t("announcement.sports"),
    t("announcement.order_wpp"),
  ]).flat();

  return (
    <div style={{ background: "linear-gradient(90deg, #8B6914 0%, #C9A220 50%, #8B6914 100%)", overflow: "hidden", paddingTop: 10, paddingBottom: 10 }}>
      <div className="marquee" style={{ gap: 0 }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 20, paddingLeft: 28, paddingRight: 28, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(28,24,20,0.80)", whiteSpace: "nowrap" }}>
            {item}
            <span style={{ color: "rgba(28,24,20,0.40)", fontSize: 8 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};
