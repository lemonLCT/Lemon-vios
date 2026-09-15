export default function SectionNav({ items }: { items: { id: string; title: string }[] }) {
  return <nav className="section-nav" aria-label="页内目录"><strong>本页目录</strong>
    {items.map((item) => <a key={item.id} href={`#${item.id}`}>{item.title}</a>)}
  </nav>;
}
