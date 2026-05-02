import { Switch, Route } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import FAQ from "@/pages/FAQ";
import News from "@/pages/News";
import OurTeam from "@/pages/OurTeam";
import Contact from "@/pages/Contact";
import ResidentialMortgages from "@/pages/ResidentialMortgages";
import BuyToLet from "@/pages/BuyToLet";
import FirstTimeBuyers from "@/pages/FirstTimeBuyers";
import Remortgaging from "@/pages/Remortgaging";
import SelfEmployed from "@/pages/SelfEmployed";
import InsuranceProtection from "@/pages/InsuranceProtection";
import CompanyDirectors from "@/pages/CompanyDirectors";
import PrivacyCookies from "@/pages/PrivacyCookies";
import MortgageCalculator from "@/pages/MortgageCalculator";
import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/faq/" component={FAQ} />
        <Route path="/faq" component={FAQ} />
        <Route path="/news/" component={News} />
        <Route path="/news" component={News} />
        <Route path="/our-team/" component={OurTeam} />
        <Route path="/our-team" component={OurTeam} />
        <Route path="/contact/" component={Contact} />
        <Route path="/contact" component={Contact} />
        <Route path="/residential-mortgages/" component={ResidentialMortgages} />
        <Route path="/residential-mortgages" component={ResidentialMortgages} />
        <Route path="/buy-to-let-mortgages/" component={BuyToLet} />
        <Route path="/buy-to-let-mortgages" component={BuyToLet} />
        <Route path="/mortgages-for-first-time-buyers/" component={FirstTimeBuyers} />
        <Route path="/mortgages-for-first-time-buyers" component={FirstTimeBuyers} />
        <Route path="/remortgaging/" component={Remortgaging} />
        <Route path="/remortgaging" component={Remortgaging} />
        <Route path="/mortgages-for-self-employed/" component={SelfEmployed} />
        <Route path="/mortgages-for-self-employed" component={SelfEmployed} />
        <Route path="/insurance-protection/" component={InsuranceProtection} />
        <Route path="/insurance-protection" component={InsuranceProtection} />
        <Route path="/mortgages-for-company-directors/" component={CompanyDirectors} />
        <Route path="/mortgages-for-company-directors" component={CompanyDirectors} />
        <Route path="/privacy-cookies/" component={PrivacyCookies} />
        <Route path="/privacy-cookies" component={PrivacyCookies} />
        <Route path="/mortgage-calculator/" component={MortgageCalculator} />
        <Route path="/mortgage-calculator" component={MortgageCalculator} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router />
    </HelmetProvider>
  );
}

export default App;
