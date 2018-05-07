import {ElasticClient} from './ElasticSearchClass';
import {StaticElasticClient} from './StaticElasticSearchClass';
import {CONFIG} from '../../utils/config.util';

let exporter = ElasticClient;

if (CONFIG.elastic.host === 'static_mocks') {
  //exporter = StaticElasticClient;
}

export default exporter;
