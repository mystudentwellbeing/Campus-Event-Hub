import styles from './TermsConditions.module.css';

const TermsConditions = () => {
  // return <div>TermsConditions</div>;
  return (
    <div className={styles.termsContainer}>
      <h1>Terms of Use</h1>
      <h1>Last Updated: December 1, 2023</h1>
      <div className={styles.termsContent}>
        <p>
        Welcome to My Student Wellbeing. These Terms of Use (&quot;Terms&quot;) govern your use of our event directory platform and associated services 
        (collectively referred to as &quot;Services&quot;) through mystudentwellbeingevents.ca. By accessing or using our Services, you agree to comply with 
        and be bound by these Terms. If you do not agree to these Terms, please do not use our Services. Our Privacy Policy is found below.
        </p>
        <p>
        The Terms of Use and Privacy Policy here on mystudentwellbeingevents.ca is different than that of mystudentwellbeing.ca.
        </p>
        <p>
          <ol className={styles.orderList}>
            <li>Acceptance of Terms</li>
              <ul className={styles.unorderList}>
                <li>
                By using our Services, you agree to these Terms and acknowledge that you are at least 16 years of age or have the legal capacity to enter into this agreement.
                </li>
              </ul>
            <li>User Registration</li>
              <ul className={styles.unorderList}>
                <li>
                To access certain features of our Services, you may be required to create an account. You agree to provide accurate and complete information during the 
                registration process. You are responsible for the security of your account and should you be unable to access it for any reason, we may not be able to restore it for you.
                </li>
              </ul>
            <li>Event Submissions</li>
              <ul className={styles.unorderList}>
                <li>
                Users may submit event details, including event name, location, affiliated university, date, time, event type, and other event related information. My Student Wellbeing
                reserves the right to review and approve or reject event submissions at its discretion.
                </li>
              </ul>
            <li>Account and Content Removal</li>
              <ul className={styles.unorderList}>
                <li>
                My Student Wellbeing Inc. may, without explanation and for any reason, remove or delete user accounts and events.
                </li>
              </ul>
            <li>No Affiliation</li>
              <ul className={styles.unorderList}>
                <li>
                My Student Wellbeing is not affiliated with any university or college. Our platform is designed to promote events around campuses.                
                </li>
                <li>
                My Student Wellbeing is not affiliated with any event or organization which has information on our event directory unless specified. 
                We do not endorse any organization or event unless specified by My Student Wellbeing.                
                </li>
                <li>
                My Student Wellbeing does not control any links provided by third parties or those who upload events and thus we are not responsible for the content on 
                their websites, including their security practices. By clicking any links you agree to hold us harmless for anything that happens as a result of you clicking on that link.                
                </li>
              </ul>
            <li>User-Requested Removal</li>
              <ul className={styles.unorderList}>
                <li>
                Users and event organizers may request the removal of events or the deletion of their accounts. 
                My Student Wellbeing will attempt to fulfill the request based on their capabilities.                
                </li>
              </ul>
            <li>Laws and Jurisdiction</li>
              <ul className={styles.unorderList}>
                <li>
                These Terms are governed by the laws of Manitoba, Canada. Any disputes arising from these 
                Terms or your use of our Services shall be subject to the exclusive jurisdiction of the courts of Manitoba, Canada.                
                </li>
              </ul>
            <li>Liability Disclaimer</li>
              <ul className={styles.unorderList}>
                <li>
                You expressly understand and agree that My Student Wellbeing Inc., its officers, directors, employees, agents, and 
                affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, 
                damages for loss of profits, goodwill, use, data, or other intangible losses (even if My Student Wellbeing Inc. has been advised of the possibility of such damages), 
                resulting from:
                <ol>
                  <li>(a) The use or inability to use the Platform;</li>
                  <li>2. (b) Unauthorized access to or alteration of your data;</li>
                  <li>3. (c) Statements or conduct of any third party on the Platform;</li>
                  <li>4. (d) Any other matter relating to the Platform.</li>
                </ol>            
                </li>
                <li>
                My Student Wellbeing total liability for any claim arising out of or relating to these Terms or the Platform shall be limited to the amount paid, 
                if any, by you to My Student Wellbeing. for the use of the Platform.                
                </li>
                <li>
                You acknowledge that My Student Wellbeing does not endorse or assume any responsibility for any event or its content. My Student Wellbeing is 
                not responsible for any interactions, disputes, or damages resulting from events listed on the Platform.                
                </li>
                <li>
                Some jurisdictions do not allow the exclusion or limitation of certain warranties or liability for certain types of damages. Therefore, 
                some of the limitations in this section may not apply to you. In such cases, My Student Wellbeing&apos;s liability will be limited to the fullest extent permitted by applicable law.                
                </li>
                <li>
                You agree that the limitations of liability set forth in this section are reasonable and that they form an essential basis of our agreement with you.                
                </li>
                <li>
                By using the Platform, you acknowledge and agree to the limitations of liability outlined in this section.                
                </li>
                <li>
                My Student Wellbeing cannot guarantee any amount of up time of this platform. This platform may experience outages or technical issues and you will 
                not be compensated for any inability to use the platform as expected.                
                </li>
              </ul>
            <li>Privacy Policy</li>
              <ul className={styles.unorderList}>
                <li>
                Your use of our Services is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.                
                </li>
              </ul>
            <li>Changes to Terms</li>
              <ul className={styles.unorderList}>
                <li>
                My Student Wellbeing Inc. reserves the right to update these Terms at any time. You can review our Terms any time and your continued 
                use of our Services constitutes acceptance of those changes.                
                </li>
              </ul>
            <li>Contact Us</li>
              <ul className={styles.unorderList}>
                <li>
                If you have any questions or concerns regarding these Terms, please contact us at events@mystudentwellbeing.ca                
                </li>
              </ul>
          </ol>
        </p>
      </div>
    </div>
  )
};

export default TermsConditions;
