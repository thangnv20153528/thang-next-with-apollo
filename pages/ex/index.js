import Link from "next/link";
export default () => (
  <div>
    Hello World.
    <Link href="/"> </Link>
    <Link href="/about">
      <a>About</a>
    </Link>
    <Link href="/helloworld" />
    <Link href="/page/" />
    <Link href="/day" />
    <Link href="/post/[pid]" as="/post/abc" />
  </div>
);
