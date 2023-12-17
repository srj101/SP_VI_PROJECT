import { Helmet } from "react-helmet-async";
import useMounted from "../../Hooks/useMounted"; // your path may differ.
import { useLocation } from "react-router-dom"; // not needed for nextjs
import nprogress from "nprogress";
import { useEffect, useState } from "react";

const ProgressBar = (props) => {
  props = {
    color: "red",
    height: "2px",
    spinner: "20px",
    ...props,
  };

  // if using NextJS you will not need the below "useMounted" hook
  // nor will you need the below "useEffect" both will be
  // handled by the Router events in the below Bonus
  // monkey patch.

  const mounted = useMounted();
  const { pathname } = useLocation(); // assumes react router v6
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) {
      nprogress.start();
      setVisible(true);
    }
    if (visible) {
      nprogress.done();
      setVisible(false);
    }
    if (!visible && mounted) {
      setVisible(false);
      nprogress.done();
    }
    return () => {
      nprogress.done();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, mounted]);

  // if using the below styles with NextJS wrap the below in
  //     <style jsx global>{`styles here `}</style>;
  // you will not need Helmet either simply return the
  // jsx style.

  const styles = `
     #nprogress .bar {
        background: ${props.color};
        height: ${props.height};
     }
     #nprogress .peg {
        box-shadow: 0 0 10px ${props.color}, 0 0 5px ${props.color};
     }
     #nprogress .spinner-icon {
        width: ${props.spinner};
        height: ${props.spinner};
        border-top-color: ${props.color};
        border-left-color: ${props.color};
     }
  `;

  return (
    <Helmet>
      <style>{styles}</style>
    </Helmet>
  );
};
export default ProgressBar;
