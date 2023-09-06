import React from 'react';
// import Footer from '@theme-original/Footer';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function FooterWrapper(props) {
  return (
    <div id="footer" className="foot-c">
      <div className="container_12">
        <div className="grid_2">
          <div className="foot-link-c"><div className="foot-title">Products</div></div>
          <div className="foot-link-c"><a className="foot-link" href="//demo.mobiscroll.com/javascript">for Javascript</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//demo.mobiscroll.com/jquery">for jQuery</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//demo.mobiscroll.com/angular">for Angular</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//demo.mobiscroll.com/react">for React</a></div>
          <div className="foot-delimiter"></div>
          <div className="foot-link-c"><a className="foot-link" href="//demo.mobiscroll.com/">View Controls</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/pricing">View Pricing</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//download.mobiscroll.com">Download Products</a></div>
        </div>
        <div className="grid_2">
          <div className="foot-link-c"><div className="foot-title">Features</div></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/event-calendar-scheduler">Event calendar & scheduler</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/date-time-picker-calendar">Date picker & calendar</a></div>

          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/mobiscroll-vs-fullcalendar">FullCalendar alternative</a></div>
          <div className="foot-delimiter"></div>
          <div className="foot-link-c"><a className="foot-link" style={{ "textTransform": "none" }} href="//mobiscroll.com/ui-for-ios">UI for iOS</a></div>
          <div className="foot-link-c"><a className="foot-link" style={{ "textTransform": "none" }} href="//mobiscroll.com/ionic-components">UI for Ionic</a></div>
          <div className="foot-link-c"><a className="foot-link" style={{ "textTransform": "none" }} href="//mobiscroll.com/cordova">UI for Cordova</a></div>
        </div>
        <div className="grid_2">
          <div className="foot-link-c"><div className="foot-title">Resources</div></div>
          <div className="foot-link-c"><a className="foot-link" href="https://blog.mobiscroll.com" target="_blank">blog</a></div>
          <div className="foot-link-c"><a className="foot-link" href="https://forum.mobiscroll.com" target="_blank">community forum</a></div>
          <div className="foot-link-c"><a className="foot-link" href="http://uipatterns.io" target="_blank">ui patterns</a></div>

          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/learning-support" target="_blank">support & learning</a></div>
          <div className="foot-link-c"><a className="foot-link" href="http://help.mobiscroll.com" target="_blank">knowledge base</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//docs.mobiscroll.com" target="_blank">docs</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/releases" target="_blank">releases</a></div>
          <div className="foot-link-c"><a className="foot-link" href="http://status.mobiscroll.com" target="_blank">status</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/faq" target="_blank">faq</a></div>
          <div className="foot-link-c"><a className="foot-link " href="https://github.com/acidb/mobiscroll/issues?state=open" target="_blank">report a bug</a></div>
        </div>
        <div className="grid_2">
          <div className="foot-link-c"><div className="foot-title">Company</div></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/company">about us</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/contact">contact</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/customers">customers</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/reviews">reviews</a></div>
          <div className="foot-delimiter"></div>
          <div className="foot-link-c"><a className="foot-link" href="http://twitter.com/mobiscroll" target="_blank">twitter</a></div>
          <div className="foot-link-c"><a className="foot-link" href="http://www.facebook.com/mobiscroll" target="_blank">facebook</a></div>
        </div>
        <div className="grid_2">
          <div className="foot-link-c"><div className="foot-title">Legal</div></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/toc" target="_blank">terms & conditions</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/privacy" target="_blank">privacy</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/cookie-policy" target="_blank">cookie policy</a></div>
          <div className="foot-link-c"><a className="foot-link" href="//mobiscroll.com/eula" target="_blank">eula</a></div>
        </div>
        <div className="clear"></div>

        <div className="grid_12 txt-right" style={{ height: '50px' }}>
        </div>
        <div className="clear"></div>

        <div className="grid_12 hr white"></div>
        <div className="clear"></div>
        <div className="grid_12 foot-bottom">
          <span className="foot-text">
            &copy; {new Date().getFullYear()} Acid Media LLC - VAT No. RO19333154</span>
          <span className="spaces">&nbsp;&nbsp;&nbsp;</span>
          <span className="foot-text">All trademarks &copy; their respective owners. Site uses cookies, you agree to this by browsing it.</span>
          <span className="footer-logo">
            <img src={useBaseUrl('/img/mobiscroll-logo.svg')} />
          </span>
        </div>
        <div className="clear"></div>
      </div>
      {/* <Footer {...props} /> */}
    </div>
  );
}
