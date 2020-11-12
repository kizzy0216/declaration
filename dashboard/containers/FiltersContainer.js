import React from 'react'
import Input from '~/shared/components/Input'

function FiltersContainer() {
  return (
    <>
      <div className="filters-container">
        <div className="filters-action-box">
          <Input
            placeholder="Search"
          />
        </div>
      </div>

      <style jsx>{`
        .filters-container {
          height: 70px;
          border-bottom: 2px solid var(--light-gray);
          padding-right: 25.5px;
          padding-left: 25.5px;
        }

        .filters-action-box: {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
        }
      `}</style>
    </>
  )
}

export default FiltersContainer;