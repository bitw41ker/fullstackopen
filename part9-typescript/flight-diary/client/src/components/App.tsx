import AddDiaryEntryForm from './AddDiaryEntryForm';
import DiaryEntries from './DiaryEntries';
import { useState } from 'react';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newDiaryEntry, setnewDiaryEntry] = useState<object>({});

  return (
    <main>
      <AddDiaryEntryForm setNewEntry={setnewDiaryEntry} />
      <DiaryEntries newDiaryEntry={newDiaryEntry} />
    </main>
  );
}

export default App;
