import os, re, json, certifi
os.environ.setdefault('SSL_CERT_FILE', certifi.where())
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from gensim import corpora
from gensim.models import LdaModel, CoherenceModel

HERE = os.path.dirname(__file__)

def main():
    a = pd.read_csv(os.path.join(HERE, 'gita_dataset.csv'))
    a2 = a[['Chapter','Verse','Enlgish Translation']]
    chapters_docs = a2.groupby('Chapter')['Enlgish Translation'].agg(lambda x: ' '.join(x)).reset_index()
    chapters_docs['Chapter_Num'] = chapters_docs['Chapter'].str.extract(r'(\d+)').astype(int)
    chapters_docs = chapters_docs.sort_values(by='Chapter_Num').drop(columns='Chapter_Num')

    lemmatizer = WordNetLemmatizer()
    stop_words = set(stopwords.words('english'))
    gita_noise = {
        'arjuna','krishna','sanjaya','dhritarashtra','kurukshetra',
        'duryodhana','bhishma','drona','bharata','partha','kaunteya',
        'madhusudana','thou','thy','thee','thine','hath','doth',
        'verily','shall','unto','upon','thus','said','dear','lord',
        'great','also','even','like','well','must','ever','know',
        'that','this','these','those','come','become','attain'
    }
    stop_words.update(gita_noise)

    def cleaning(text):
        text = text.lower()
        text = re.sub(r'[^a-z\s]', '', text)
        words_list = text.split()
        return [lemmatizer.lemmatize(w) for w in words_list if w not in stop_words and len(w) > 2]

    cleaned_docs = [cleaning(t) for t in chapters_docs['Enlgish Translation'].values]

    dictionary = corpora.Dictionary(cleaned_docs)
    dictionary.filter_extremes(no_below=2, no_above=0.85)
    corpus = [dictionary.doc2bow(doc) for doc in cleaned_docs]

    print(f"Dictionary size: {len(dictionary)} words")
    print(f"Corpus: {len(corpus)} documents (chapters)")

    coherence_scores = {}
    for n in range(2, 15):
        m = LdaModel(corpus=corpus, id2word=dictionary, num_topics=n, random_state=42, passes=10)
        cm = CoherenceModel(model=m, texts=cleaned_docs, dictionary=dictionary, coherence='c_v')
        score = cm.get_coherence()
        coherence_scores[n] = score
        print(f"N={n:2d}  coherence={score:.4f}")

    best_k = max(coherence_scores, key=coherence_scores.get)
    print('best K by real coherence:', best_k, coherence_scores[best_k])

    K = 7
    lda_model = LdaModel(corpus=corpus, id2word=dictionary, num_topics=K, random_state=42, passes=10)
    lda_model.save(os.path.join(HERE, 'lda_model.gensim'))
    dictionary.save(os.path.join(HERE, 'lda_dictionary.gensim'))

    topics_top_words = {}
    for i in range(K):
        topics_top_words[i] = lda_model.show_topic(i, topn=10)

    doc_topics = []
    for doc in corpus:
        dist = lda_model.get_document_topics(doc, minimum_probability=0)
        doc_topics.append([float(prob) for _, prob in sorted(dist)])

    result = {
        'coherence_scores': coherence_scores,
        'best_k_by_coherence': best_k,
        'k_used': K,
        'chapters': chapters_docs['Chapter'].tolist(),
        'topics_top_words': {str(k): [[w, float(p)] for w, p in v] for k, v in topics_top_words.items()},
        'chapter_topic_matrix': doc_topics,
    }
    with open(os.path.join(HERE, 'lda_real_data.json'), 'w') as f:
        json.dump(result, f, indent=2)
    print('saved lda_real_data.json')

if __name__ == '__main__':
    main()
