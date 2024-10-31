import { Link } from "react-router-dom";
import Transition from "../../components/common/Transition";
import { cn } from "../../lib/utils";
import styles from "./NoPermisson.module.css";

export default function NoPermisson() {
  return (
    <Transition>
      <section className="flex h-screen w-full items-center justify-center">
        <div
          className="bg-secondary text-primary flex h-full w-full items-center justify-center rounded px-8 py-4 transition-colors duration-300 md:px-12 md:py-8"
          id="error-page"
        >
          <div
            className={cn("content max-w-[600px] text-center", styles.content)}
          >
            <h2
              className={cn(
                "relative mb-4 max-w-[600px] font-sans text-[120px] font-bold leading-[1em] after:absolute after:left-0 after:right-0 after:top-0 sm:text-[160px]",
                styles.header,
              )}
              data-text="403"
            >
              403
            </h2>
            <h4
              className="mb-5 max-w-[600px] text-[20px] uppercase sm:text-[24px]"
              data-text="You shall not pass!."
            >
              You shall not pass!.
            </h4>
            <p className="text-balance text-[1em] sm:text-[1.2em]">
              It seems like you have wandered into a restricted area. You do not
              have permission to access this page.
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <Link to="/">
                <button className="rounded-sm bg-sky-500 px-3 py-2 text-white transition-colors hover:bg-sky-600 active:bg-sky-500">
                  Trang chủ
                </button>
              </Link>
              <button className="bg-indigo-500 px-3 py-2 text-white hover:bg-indigo-600 active:bg-indigo-500">
                Report a problem
              </button>
            </div>
          </div>
        </div>
      </section>
    </Transition>
  );
}
