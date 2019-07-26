import Questions from './Questions';
import RichTextEditor from './RichTextEditor';
import MasteryMap from './MasteryMap';
import QuestionForm from './QuestionForm';
import DeckCreator from './DeckCreator';
import mockServer from './mock_server';

mockServer();

Questions(module);
QuestionForm(module);
RichTextEditor(module);
MasteryMap(module);
DeckCreator(module);
