import { GridViewEQ } from 'style';

type Props = {
  firstFile: string;
  secondFile: string;
};

export const PlagiarismFile = ({ firstFile, secondFile }: Props) => {
  return (
    <GridViewEQ>
      <pre
        className="draggableText"
        dangerouslySetInnerHTML={{ __html: firstFile }}
      />
      <pre
        className="draggableText"
        dangerouslySetInnerHTML={{ __html: secondFile }}
      />
    </GridViewEQ>
  );
};
