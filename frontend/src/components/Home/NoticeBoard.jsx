import { useEffect, useRef } from "react";

const NoticeBoard = () => {
  const noticeBoardRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    const noticeElement = noticeBoardRef.current;
    if (!noticeElement || noticeElement.children.length <= 1) return;

    const scrollSpeed = 1;
    const intervalTime = 75;

    const startScrolling = () => {
      if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current);
      }

      scrollIntervalRef.current = setInterval(() => {
        const firstChild = noticeElement.firstChild;
        if (!firstChild) return;

        if (noticeElement.scrollTop >= firstChild.offsetHeight) {
          noticeElement.appendChild(firstChild);
          noticeElement.scrollTop -= firstChild.offsetHeight;
        } else {
          noticeElement.scrollTop += scrollSpeed;
        }
      }, intervalTime);
    };

    const stopScrolling = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };

    startScrolling();

    noticeElement.addEventListener('mouseenter', stopScrolling);
    noticeElement.addEventListener('mouseleave', startScrolling);

    return () => {
      stopScrolling();
      if (noticeElement) {
        noticeElement.removeEventListener('mouseenter', stopScrolling);
        noticeElement.removeEventListener('mouseleave', startScrolling);
      }
    };
  }, []);

  return (
    <div className="bg-primary text-white p-3 mb-4 shadow-sm">
      <h5 className="border-bottom pb-2">NOTICE BOARD</h5>
      <ul ref={noticeBoardRef} className="list-unstyled mb-0" style={{ height: '210px', overflowY: 'hidden' }}>
        <li className="py-2 border-bottom">
          <small className="d-block text-white-50">04 May 2023</small>
          <span className="fw-bold text-white">Registration open for Heart and Sole Run 7</span>
        </li>
        <li className="py-2 border-bottom">
          <small className="d-block text-white-50">10 May 2023</small>
          <span className="fw-bold text-white">Bit and Build hackathon schedule announced</span>
        </li>
        <li className="py-2 border-bottom">
          <small className="d-block text-white-50">15 May 2023</small>
          <span className="fw-bold text-white">Athlead speaker lineup confirmed</span>
        </li>
        <li className="py-2 border-bottom">
           <small className="d-block text-white-50">18 May 2023</small>
           <span className="fw-bold text-white">New workshop dates added for June</span>
         </li>
         <li className="py-2 border-bottom">
           <small className="d-block text-white-50">20 May 2023</small>
           <span className="fw-bold text-white">Volunteer call for upcoming charity drive</span>
         </li>
         <li className="py-2 border-bottom">
           <small className="d-block text-white-50">22 May 2023</small>
           <span className="fw-bold text-white">Reminder: Submit project proposals by Friday</span>
         </li>
         <li className="py-2">
           <small className="d-block text-white-50">25 May 2023</small>
           <span className="fw-bold text-white">Campus maintenance schedule update</span>
         </li>
      </ul>
    </div>
  );
};

export default NoticeBoard; 