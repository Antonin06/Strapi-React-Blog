import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Import pages & components
import Homepage from "./pages/Homepage";
import PostDetails from "./pages/PostDetails";
import Category from "./pages/Category";
import SiteHeader from "./components/SiteHeader";

// Import SCSS
import './assets/scss/custom.scss';

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
                    </Switch>
                </div>
            </ApolloProvider>
        </Router>
    );
}

export default App;
