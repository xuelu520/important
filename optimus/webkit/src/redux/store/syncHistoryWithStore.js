/**
 * 同步 history 配置
 * User: gaogy
 * Date: 2016/11/28
 * Time: 15:00
 */
import createBrowserHistory from 'history/createBrowserHistory';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

const browserRouter = createBrowserHistory();

export const historyMiddleware = routerMiddleware(browserRouter);

/**
 * history的变化会更新state
 * @param  {Store}
 * @return {History}
 */
export default function (store) {
    return syncHistoryWithStore(
        browserRouter,
        store,
        {selectLocationState: (state) => state.router}
    );
}
