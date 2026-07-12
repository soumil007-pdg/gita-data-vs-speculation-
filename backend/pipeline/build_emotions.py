import os, json, certifi
os.environ.setdefault('SSL_CERT_FILE', certifi.where())
import pandas as pd
from transformers import pipeline

HERE = os.path.dirname(__file__)

def main():
    a = pd.read_csv(os.path.join(HERE, 'gita_dataset.csv'))

    clf = pipeline(task='text-classification', model='SamLowe/roberta-base-go_emotions', top_k=None)

    verses = a['Enlgish Translation'].astype(str).tolist()
    print(f'classifying {len(verses)} verses...')
    raw = clf(verses, batch_size=16, truncation=True)
    print('done classifying all verses')

    a['top_emotion'] = [max(v, key=lambda d: d['score'])['label'] for v in raw]
    emotion_rows = [{d['label']: d['score'] for d in v} for v in raw]
    emotion_df = pd.DataFrame(emotion_rows)
    emotion_df['Chapter'] = a['Chapter'].values
    emotion_df['Speaker'] = a['Speaker'].values

    # aggregate: top emotions across all 700 verses (sum of top-1 counts, like value_counts)
    top_counts = a['top_emotion'].value_counts().to_dict()

    def chapter_matrix(speaker):
        sub = emotion_df[emotion_df['Speaker'] == speaker] if speaker else emotion_df
        grouped = sub.groupby('Chapter').mean(numeric_only=True)
        grouped = grouped.reindex([f'Chapter {i}' for i in range(1, 19)])
        # pick top emotions overall for this subset, excluding neutral
        top_e = grouped.mean().nlargest(11).index.tolist()
        top_e = [e for e in top_e if e != 'neutral'][:10]
        matrix = grouped[top_e].fillna(0).round(4)
        return top_e, matrix.values.tolist()

    krishna_emotions, krishna_matrix = chapter_matrix('Krishna')
    arjuna_emotions, arjuna_matrix = chapter_matrix('Arjuna')

    result = {
        'top_emotion_counts_all': top_counts,
        'krishna_top_emotions': krishna_emotions,
        'krishna_chapter_matrix': krishna_matrix,
        'arjuna_top_emotions': arjuna_emotions,
        'arjuna_chapter_matrix': arjuna_matrix,
        'chapters': [f'Chapter {i}' for i in range(1, 19)],
    }
    with open(os.path.join(HERE, 'emotions_real_data.json'), 'w') as f:
        json.dump(result, f, indent=2)
    print('saved emotions_real_data.json')

if __name__ == '__main__':
    main()
