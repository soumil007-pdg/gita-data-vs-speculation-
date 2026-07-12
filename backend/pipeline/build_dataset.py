import os, certifi
os.environ.setdefault('SSL_CERT_FILE', certifi.where())
import pandas as pd
import spacy

nlp = spacy.load('en_core_web_sm')

SPEECH_VERBS = ['speak','explain','ask','say','tell','instruct','call','name',
                'conclude','continue','reply','declare','proclaim','narrate','recount','state']
PRONOUNS = {'i','he','she','they','you','we','it','son','men','people','brahma','thay'}
SPEAKER_MAP = {
    'lord':'Krishna','hrishikesa':'Krishna','almighty':'Krishna','krishna':'Krishna',
    'madhusudana':'Krishna','govinda':'Krishna',
    'sanjaya':'Sanjaya','sanjay':'Sanjaya',
    'arjuna':'Arjuna','partha':'Arjuna','dhananjaya':'Arjuna',
    'duryodhana':'Duryodhana','dhrtarashtra':'Dhrtarashtra',
}

def main():
    a = pd.read_csv('https://raw.githubusercontent.com/i8o8i-Developer/Bhagwat-Gita-DataSet/refs/heads/main/Main.csv')
    a_english = a[['Title','Chapter','Verse','Enlgish Translation']].copy()

    speakers = []
    last_speaker = 'UNKNOWN'
    for verse in a_english['Enlgish Translation']:
        detected = None
        doc = nlp(verse)
        for token in doc:
            if token.lemma_.lower() in SPEECH_VERBS:
                verb = token
                for other in doc:
                    if other.dep_ == 'nsubj' and other.head == verb:
                        cand = other.text
                        detected = None if cand.lower() in PRONOUNS else cand
                        break
                break
        if detected:
            last_speaker = detected
            speakers.append(detected)
        else:
            speakers.append(last_speaker)

    a_english['Speaker'] = speakers
    a_english['Speaker'] = a_english['Speaker'].apply(lambda s: SPEAKER_MAP.get(s.lower(), s))

    out_path = os.path.join(os.path.dirname(__file__), 'gita_dataset.csv')
    a_english.to_csv(out_path, index=False)
    print('saved', out_path, a_english.shape)
    print(a_english['Speaker'].value_counts())

if __name__ == '__main__':
    main()
