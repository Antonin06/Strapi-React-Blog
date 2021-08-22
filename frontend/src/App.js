import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Import pages & components
import Homepage from "./pages/Homepage";
import PostDetails from "./pages/PostDetails";
import Category from "./pages/Category";
import Blog from "./pages/Blog";
import SiteHeader from "./components/SiteHeader";
import Footer from "./components/Footer";

// Import SCSS
import './assets/scss/styles.scss';

// Setup Apollo Client
const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache()
})

function App() {
    return (
        <Router>
            <ApolloProvider client={client}>
                <div className="App">
                    <SiteHeader />
                    <Switch>
                        <Route exact path="/">
                            <Homepage/>
                        </Route>
                        <Route path="/blog/:id">
                            <PostDetails/>
                        </Route>
                        <Route path="/categories/:id">
                            <Category/>
                        </Route>
                        <Route path="/blog">
                            <Blog/>
                        </Route>
                    </Switch>
                    <Footer/>
                </div>
            </ApolloProvider>
        </Router>
    );
}

export default App;
