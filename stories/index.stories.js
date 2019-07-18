import Questions from './Questions';
import RichTextEditor from './RichTextEditor';
import DeckCreator from './DeckCreator';
import QuestionForm from './QuestionForm';
import mockServer from './mockServer';

mockServer();

Questions(module);
QuestionForm(module);
RichTextEditor(module);
DeckCreator(module);
