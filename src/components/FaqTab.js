import React, { useMemo } from 'react';
import SearchInput from './SearchInput'
import getFaqData from '../utils/getFaqData'

const FaqTab = ({ searchInput, setSearchInput, languageFrom, languageTo }) => {
  const faqs = useMemo(() => {
    const faqData = getFaqData(languageFrom, languageTo);
    const output = [];

    for (let i = 0; i < faqData.length / 2; i += 2) {
      const question = faqData[i];
      const answer = faqData[i + 1];
      output.push({
        question,
        answer,
      });
    }

    return output;
  }, [
    languageFrom, languageTo,
  ]);

  const renderCards = () => faqs.map(faq =>
    <div className="card" key={faq.question.id}>
      <div className="card-body" style={{ textAlign: "left", cursor: 'pointer' }}>
        <p className="card-text" style={{ fontSize: 22, fontWeight: 100 }}>{faq.question.from}</p>
        <p className="card-title" style={{ fontSize: 22, fontWeight: 300 }}>{faq.question.to}</p>

        <p className="card-text" style={{ fontSize: 15, fontWeight: 100 }}>{faq.answer.from}</p>
        <p className="card-title" style={{ fontSize: 15, fontWeight: 100 }}>{faq.answer.to}</p>
      </div>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col" style={{ display: 'flex' }}>
          <SearchInput id="search-masterlist" searchInput={searchInput} setSearchInput={setSearchInput} />
        </div>
      </div>
      <div className="row">
        <div className="col faq-cards" style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {renderCards()}
        </div>
      </div>
    </div>
  );
}

export default FaqTab;
