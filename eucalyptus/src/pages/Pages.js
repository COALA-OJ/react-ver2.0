import React from 'react';
import {Switch , Route} from 'react-router-dom';
import { Auth, 
    Problemset,
} from './index';
import { Submit, Probleminfo } from '../containers/Problemset'

const Pages = () => (
    <Switch>
        {/* <Route exact path="/" component={Home}/> */}
        <Route path='/auth' component={Auth} />
        <Route path='/problemset' component={Problemset}/>
        <Route path='/problem/:id' component={Probleminfo}/>
        <Route path='/submit/:id' component={Submit} />
    </Switch>

);
export default Pages