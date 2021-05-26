// import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Div } from '../../course-page/course-components/settings/settings-components/teachers/style';

import { Title } from '../settings-style';

type Props = {
  options: {};
};

export const Teams = (props: Props) => {
  let data: any = props.options;
  const view = data.teams.map((item: any) => {
    return (
      <Link
        key={item.name + Date()}
        className="disable-link-style link f1"
        to={``}
      >
        <Div className="p-3 mt-2">
          <Title className="disable-link-style link f1">{item.name}</Title>
        </Div>
      </Link>
    );
  });

  return <div>{view}</div>;
};
