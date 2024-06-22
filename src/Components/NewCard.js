import React from 'react'

function NewCard() {
  return (
    <div>
      <div
                                        
                                        className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform">
                                        <p className="text-lg font-extrabold text-blue-600 uppercase tracking-wide mb-4">Ravi Computer</p>
                                        <p className="text-sm mb-2">GST:</p>
                                     <p className="text-sm mb-2">GST Type: </p>
                                        <p className="text-sm mb-2">Address:</p>
                                        <p className="text-sm mb-2">Mobile No: </p>
                                        <p className="text-sm mb-2">State: </p>
                                        <p className="text-sm mb-2">Email: </p>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Update
                                        </button>
                                    </div>
    </div>
  )
}

export default NewCard
