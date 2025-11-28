import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoice, FaArrowLeft, FaShoppingBag, FaCalculator, FaSpinner, FaCalendarAlt, FaBoxOpen, FaChevronDown, FaEye, FaDownload } from 'react-icons/fa';
import Cookies from 'js-cookie';

const MyOrdersPage = () => {
  const navigate = useNavigate();
  
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  // Fetch quotations from ERPNext
  const fetchQuotations = useCallback(async () => {
    try {
      setLoading(true);
      const fullName = Cookies.get('full_name');
      console.log('📋 Fetching quotations for user:', fullName);

      const response = await fetch(
        `/api/resource/Quotation?fields=["name","quotation_to","party_name","transaction_date","grand_total","status","currency","items","modified"]&filters=[["docstatus","!=",2],["customer_name","=","${fullName}"]]&limit_page_length=50&order_by=creation desc`,
        {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'application/json' 
          },
          credentials: 'include'
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log('📋 Quotations API Response:', result);

        if (result.data && Array.isArray(result.data)) {
          const transformedQuotations = result.data.map(quote => {
            const mainItemName = quote.items && quote.items.length > 0 ? 
              (quote.items[0].item_name || quote.items[0].item_code || 'Product') : 
              'Quotation Items';

            return {
              id: quote.name,
              orderNumber: quote.name,
              type: 'Quotation',
              date: quote.transaction_date,
              customerName: quote.party_name,
              amount: quote.grand_total,
              currency: quote.currency || 'K',
              status: quote.status,
              items: quote.items || [],
              mainProductName: mainItemName,
              formattedAmount: `${quote.currency || 'K'} ${parseFloat(quote.grand_total || 0).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`,
              formattedDate: new Date(quote.transaction_date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              shortDate: new Date(quote.transaction_date).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })
            };
          });

          transformedQuotations.sort((a, b) => new Date(b.date) - new Date(a.date));
          setQuotations(transformedQuotations);
          console.log('✅ Fetched quotations:', transformedQuotations.length);
        } else {
          setQuotations([]);
        }
      } else {
        throw new Error('Failed to fetch quotations');
      }
    } catch (error) {
      console.error('❌ Error fetching quotations:', error);
      setError(error.message);
      setQuotations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const handleMakeHirePurchase = (quotation) => {
    navigate('/emi-calculator', { state: { quotation } });
  };

  const handleViewQuotation = (quotationName) => {
    window.open(`/app/quotation/${quotationName}`, '_blank');
  };

  const handleDownloadQuotation = (quotationName) => {
    window.open(
      `/api/method/frappe.utils.print_format.download_pdf?doctype=Quotation&name=${quotationName}&format=Standard&no_letterhead=0`,
      '_blank'
    );
  };

  if (loading) {
    return (
      <div style={{
        backgroundColor: '#F3F4F6',
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <FaSpinner 
            size={40} 
            color="#3B82F6" 
            style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }} 
          />
          <p style={{ color: '#6B7280', fontSize: '16px' }}>Loading your orders...</p>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        backgroundColor: '#F3F4F6',
        minHeight: '100vh',
        padding: '40px 20px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: '#EF4444' }}>Error Loading Orders</h2>
          <p style={{ color: '#6B7280' }}>{error}</p>
          <button
            onClick={fetchQuotations}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3B82F6',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (quotations.length === 0) {
    return (
      <div style={{
        backgroundColor: '#F3F4F6',
        minHeight: '100vh',
        padding: '40px 20px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '40px', textAlign: 'left' }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#374151',
                fontSize: '14px'
              }}
            >
              <FaArrowLeft size={14} />
              Back
            </button>
          </div>

          <FaFileInvoice size={80} color="#CCCCCC" style={{ marginBottom: '24px' }} />
          <h2 style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#1F2937',
            margin: '0 0 16px 0'
          }}>
            No Orders Yet
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#6B7280',
            marginBottom: '32px'
          }}>
            You haven't created any quotations yet. Start shopping and create your first quotation!
          </p>
          <button
            onClick={() => navigate('/trade')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FF9900',
              color: '#FFFFFF',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: '600',
              textDecoration: 'none',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <FaShoppingBag /> Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#F3F4F6',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#374151',
              fontSize: '14px'
            }}
          >
            <FaArrowLeft size={14} />
            Back
          </button>

          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#1F2937',
            margin: 0
          }}>
            My Orders ({quotations.length})
          </h1>

          <div style={{ width: '80px' }}></div>
        </div>

        {/* Quotations List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {quotations.map((quotation) => {
            const isExpanded = expandedOrders.has(quotation.id);

            return (
              <div
                key={quotation.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '2px solid #E5E7EB'
                }}
              >
                {/* Quotation Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #E5E7EB'
                }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px'
                    }}>
                      <FaFileInvoice size={20} color="#FF9900" />
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1F2937',
                        margin: 0
                      }}>
                        Quotation #{quotation.orderNumber}
                      </h3>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6B7280'
                    }}>
                      Created on: {quotation.shortDate}
                    </div>
                  </div>

                  {/* Make Hire Purchase Button */}
                  <button
                    onClick={() => handleMakeHirePurchase(quotation)}
                    style={{
                      padding: '10px 16px',
                      backgroundColor: '#3B82F6',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2563EB'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3B82F6'}
                  >
                    <FaCalculator size={14} />
                    Make Hire Purchase
                  </button>
                </div>

                {/* Quotation Summary */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  marginBottom: '20px',
                  padding: '16px',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      marginBottom: '4px'
                    }}>
                      Total Items
                    </div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1F2937'
                    }}>
                      {quotation.items.length}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      marginBottom: '4px'
                    }}>
                      Total Amount
                    </div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1F2937'
                    }}>
                      {quotation.formattedAmount}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      marginBottom: '4px'
                    }}>
                      Status
                    </div>
                    <span style={{
                      backgroundColor: quotation.status === 'Draft' ? '#FEF3CD' : 
                                      quotation.status === 'Open' ? '#DBEAFE' : '#E8F5E9',
                      color: quotation.status === 'Draft' ? '#B45309' : 
                             quotation.status === 'Open' ? '#1E40AF' : '#2E7D32',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 8px',
                      borderRadius: '12px'
                    }}>
                      {quotation.status}
                    </span>
                  </div>
                </div>

                {/* Quotation Items */}
                <details style={{ cursor: 'pointer' }}>
                  <summary style={{
                    color: '#3B82F6',
                    fontSize: '14px',
                    fontWeight: '600',
                    padding: '8px 0',
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    View Items ({quotation.items.length})
                    <span style={{ marginLeft: 'auto' }}>▼</span>
                  </summary>

                  <div style={{ marginTop: '16px' }}>
                    {quotation.items.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px',
                          borderBottom: index < quotation.items.length - 1 ? '1px solid #E5E7EB' : 'none',
                          gap: '16px'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1F2937',
                            marginBottom: '4px'
                          }}>
                            {item.item_name || item.item_code}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#6B7280'
                          }}>
                            Quantity: {item.qty} | Rate: {quotation.currency} {parseFloat(item.rate || 0).toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#1F2937'
                        }}>
                          {quotation.currency} {parseFloat(item.amount || 0).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid #E5E7EB'
                }}>
                  <button
                    onClick={() => handleViewQuotation(quotation.orderNumber)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: '#374151',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    <FaEye size={14} />
                    View in ERPNext
                  </button>

                  <button
                    onClick={() => handleDownloadQuotation(quotation.orderNumber)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#FF9900',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    <FaDownload size={14} />
                    Download PDF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
