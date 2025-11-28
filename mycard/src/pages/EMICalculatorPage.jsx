import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalculator, FaPaperclip } from 'react-icons/fa';
import Cookies from 'js-cookie';

const EMICalculatorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const quotation = location.state?.quotation || null;

    // Form State
    const [customer, setCustomer] = useState('Mr.');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [installmentType, setInstallmentType] = useState('FORTNIGHTLY');
    const [quotationId, setQuotationId] = useState(quotation?.orderNumber || '');
    const [principalAmount, setPrincipalAmount] = useState(quotation?.amount || 0);
    const [downPaymentAmount, setDownPaymentAmount] = useState(0);
    const [numberOfFortnights, setNumberOfFortnights] = useState(11);
    const [interest, setInterest] = useState(19.5);

    // File attachments state
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);

    // Calculated Values
    const [efiAmount, setEfiAmount] = useState(0);
    const [totalInterestAmount, setTotalInterestAmount] = useState(0);
    const [totalAmountToBePaid, setTotalAmountToBePaid] = useState(0);
    const [efiDetails, setEfiDetails] = useState([]);

    // Get user name from cookies
    useEffect(() => {
        const fullName = Cookies.get('full_name') || '';
        const nameParts = fullName.split(' ');
        if (nameParts.length > 0) setFirstName(nameParts[0]);
        if (nameParts.length > 1) setLastName(nameParts.slice(1).join(' '));
    }, []);

    // Auto-update interest rate based on number of fortnights
    useEffect(() => {
        let newInterest = 0;
        if (numberOfFortnights >= 1 && numberOfFortnights <= 12) {
            newInterest = 19.5;
        } else if (numberOfFortnights >= 13 && numberOfFortnights <= 24) {
            newInterest = 38.9;
        } else if (numberOfFortnights >= 25 && numberOfFortnights <= 36) {
            newInterest = 58.4;
        }
        setInterest(newInterest);
    }, [numberOfFortnights]);

    // Calculate EMI Schedule - trigger on any field change
    useEffect(() => {
        if (principalAmount > 0 && numberOfFortnights > 0) {
            calculateEMI();
        }
    }, [principalAmount, downPaymentAmount, interest, numberOfFortnights]);

    const calculateEMI = () => {
        const principal = parseFloat(principalAmount) || 0;
        const downPayment = parseFloat(downPaymentAmount) || 0;
        const interestRate = parseFloat(interest) || 0;
        const numFortnights = parseInt(numberOfFortnights) || 0;

        const P = principal - downPayment;

        if (P <= 0 || interestRate < 0 || numFortnights <= 0) {
            return;
        }

        const periodsPerYear = 26;
        const R = (interestRate / 100) / periodsPerYear;

        const efi = (P * R * Math.pow(1 + R, numFortnights)) / (Math.pow(1 + R, numFortnights) - 1);
        const roundedEfi = Math.round(efi * 100) / 100;

        setEfiAmount(roundedEfi);

        let outstandingPrincipal = P;
        let totalInterest = 0;
        const schedule = [];

        for (let i = 1; i <= numFortnights; i++) {
            const interestComponent = outstandingPrincipal * R;
            const principalComponent = roundedEfi - interestComponent;
            const closingBalance = outstandingPrincipal - principalComponent;

            const roundedInterest = Math.round(interestComponent * 100) / 100;
            const roundedPrincipal = Math.round(principalComponent * 100) / 100;
            const roundedClosing = Math.round(closingBalance * 100) / 100;

            totalInterest += roundedInterest;

            schedule.push({
                no: i,
                numberOfFortnights: i,
                totalAmount: roundedEfi,
                efiPrinciple: roundedPrincipal,
                efiInterest: roundedInterest,
                closingBalance: roundedClosing,
                outstandingPrincipal: Math.round(outstandingPrincipal * 100) / 100
            });

            outstandingPrincipal = closingBalance;
        }

        const roundedTotalInterest = Math.round(totalInterest * 100) / 100;
        setTotalInterestAmount(roundedTotalInterest);
        setTotalAmountToBePaid(Math.round((principal + roundedTotalInterest) * 100) / 100);
        setEfiDetails(schedule);
    };

    const handleRecalculate = () => {
        calculateEMI();
    };

    const handleFileChange = (fileNumber, event) => {
        const file = event.target.files[0];
        if (file) {
            switch (fileNumber) {
                case 1: setFile1(file); break;
                case 2: setFile2(file); break;
                case 3: setFile3(file); break;
                case 4: setFile4(file); break;
                default: break;
            }
        }
    };

    const handleSubmit = () => {
        console.log('Form submitted with data:', {
            customer: `${customer} ${firstName} ${lastName}`,
            installmentType,
            quotationId,
            principalAmount,
            downPaymentAmount,
            numberOfFortnights,
            interest,
            efiAmount,
            totalInterestAmount,
            totalAmountToBePaid,
            files: { file1, file2, file3, file4 }
        });
        alert('EMI Calculator form submitted successfully!');
    };

    if (!quotation) {
        return (
            <div style={{
                backgroundColor: '#F3F4F6',
                minHeight: '100vh',
                padding: '40px 20px'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h2 style={{ color: '#1F2937' }}>No Quotation Selected</h2>
                    <p style={{ color: '#6B7280' }}>Please select a quotation from My Orders to calculate EMI.</p>
                    <button
                        onClick={() => navigate('/my-orders')}
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
                        Go to My Orders
                    </button>
                </div>
            </div>
        );
    }

    const months = (numberOfFortnights / 2).toFixed(1);
    const years = (numberOfFortnights / 26).toFixed(2);

    return (
        <div style={{
            backgroundColor: '#F3F4F6',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {/* Back Button */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '20px'
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
                </div>

                {/* EFI Details Section */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '30px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '2px solid #E5E7EB',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '24px'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#DDD6FE',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px'
                        }}>
                            👤
                        </div>
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#1F2937',
                            margin: 0
                        }}>
                            EFI Details
                        </h2>
                    </div>
                    <hr style={{ border: 'none', borderTop: '2px solid #8B5CF6', marginBottom: '30px', width: '60px' }} />

                    {/* Row 1: Title, First Name, Last Name */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px',
                        marginBottom: '30px'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#4B5563',
                                marginBottom: '8px'
                            }}>
                                Title <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <select
                                value={customer}
                                onChange={(e) => setCustomer(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    backgroundColor: '#FFFFFF',
                                    color: '#1F2937',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                            >
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Ms.">Ms.</option>
                            </select>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#4B5563',
                                marginBottom: '8px'
                            }}>
                                First Name <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    backgroundColor: '#FFFFFF',
                                    color: '#1F2937',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#4B5563',
                                marginBottom: '8px'
                            }}>
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    backgroundColor: '#FFFFFF',
                                    color: '#1F2937',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                            />
                        </div>
                    </div>

                    {/* Row 2: Installment Type, Quotation ID, Principal Amount */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px',
                        marginBottom: '30px'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#4B5563',
                                marginBottom: '8px'
                            }}>
                                Installment Type <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <select
                                value={installmentType}
                                onChange={(e) => setInstallmentType(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    backgroundColor: '#FFFFFF',
                                    color: '#1F2937',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                            >
                                <option value="FORTNIGHTLY">FORTNIGHTLY</option>
                                <option value="MONTHLY">MONTHLY</option>
                                <option value="QUARTERLY">QUARTERLY</option>
                            </select>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#4B5563',
                                marginBottom: '8px'
                            }}>
                                Quotation ID
                            </label>
                            <input
                                type="text"
                                value={quotationId}
                                readOnly
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    backgroundColor: '#F9FAFB',
                                    color: '#6B7280',
                                    cursor: 'not-allowed'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#4B5563',
                                marginBottom: '8px'
                            }}>
                                Principal Amount <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input
                                type="number"
                                value={principalAmount}
                                onChange={(e) => setPrincipalAmount(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    backgroundColor: '#FFFFFF',
                                    color: '#1F2937',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                            />
                        </div>
                    </div>

                    {/* Row 3: Down Payment, Number of Fortnights, Interest */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px',
                        marginBottom: '30px'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#4B5563',
                                marginBottom: '8px'
                            }}>
                                Down Payment Amount <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <input
                                type="number"
                                value={downPaymentAmount}
                                onChange={(e) => setDownPaymentAmount(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    backgroundColor: '#FFFFFF',
                                    color: '#1F2937',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#4B5563',
                                marginBottom: '8px'
                            }}>
                                Number Of Fortnights <span style={{ color: '#EF4444' }}>*</span>
                            </label>
                            <select
                                value={numberOfFortnights}
                                onChange={(e) => setNumberOfFortnights(parseInt(e.target.value))}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    backgroundColor: '#FFFFFF',
                                    color: '#1F2937',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                            >
                                {Array.from({ length: 36 }, (_, i) => i + 1).map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                            <p style={{
                                fontSize: '12px',
                                color: '#9CA3AF',
                                marginTop: '6px'
                            }}>
                                {numberOfFortnights} fortnights = {months} months = {years} years
                            </p>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#4B5563',
                                marginBottom: '8px'
                            }}>
                                Interest Percentage (%)
                            </label>
                            <input
                                type="text"
                                value={interest.toFixed(3)}
                                readOnly
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    backgroundColor: '#F9FAFB',
                                    color: '#6B7280'
                                }}
                            />
                        </div>
                    </div>

                    {/* Calculated Summary */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '20px',
                        marginBottom: '30px',
                        padding: '20px',
                        backgroundColor: '#F9FAFB',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#6B7280',
                                marginBottom: '6px'
                            }}>
                                EFI Amount
                            </label>
                            <div style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                color: '#1F2937'
                            }}>
                                K {efiAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#6B7280',
                                marginBottom: '6px'
                            }}>
                                Total Interest Amount
                            </label>
                            <div style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                color: '#1F2937'
                            }}>
                                K {totalInterestAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#6B7280',
                                marginBottom: '6px'
                            }}>
                                Total Amount To Be Paid
                            </label>
                            <div style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                color: '#7C3AED'
                            }}>
                                {totalAmountToBePaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                            {/* <button
                                onClick={handleRecalculate}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#3B82F6',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px'
                                }}
                            >
                                <FaCalculator /> Recalculate
                            </button> */}
                        </div>
                    </div>

                    {/* EFI Details Table */}
                    <div>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#1F2937',
                            marginBottom: '16px'
                        }}>
                            EFI Details
                        </h3>

                        <div style={{
                            overflowX: 'auto',
                            border: '1px solid #E5E7EB',
                            borderRadius: '12px'
                        }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                fontSize: '14px'
                            }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#F9FAFB' }}>
                                        <th style={{
                                            padding: '14px 16px',
                                            textAlign: 'left',
                                            borderBottom: '1px solid #E5E7EB',
                                            fontWeight: '600',
                                            color: '#6B7280',
                                            fontSize: '13px'
                                        }}>No.</th>
                                        <th style={{
                                            padding: '14px 16px',
                                            textAlign: 'center',
                                            borderBottom: '1px solid #E5E7EB',
                                            fontWeight: '600',
                                            color: '#6B7280',
                                            fontSize: '13px'
                                        }}>Number Of Fortnights</th>
                                        <th style={{
                                            padding: '14px 16px',
                                            textAlign: 'right',
                                            borderBottom: '1px solid #E5E7EB',
                                            fontWeight: '600',
                                            color: '#6B7280',
                                            fontSize: '13px'
                                        }}>Total EFI Amount (Includin Interest)</th>
                                        <th style={{
                                            padding: '14px 16px',
                                            textAlign: 'right',
                                            borderBottom: '1px solid #E5E7EB',
                                            fontWeight: '600',
                                            color: '#6B7280',
                                            fontSize: '13px'
                                        }}>EFI Principle</th>
                                        <th style={{
                                            padding: '14px 16px',
                                            textAlign: 'right',
                                            borderBottom: '1px solid #E5E7EB',
                                            fontWeight: '600',
                                            color: '#6B7280',
                                            fontSize: '13px'
                                        }}>EFI Interest</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {efiDetails.map((detail, index) => (
                                        <tr key={index} style={{
                                            backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB'
                                        }}>
                                            <td style={{
                                                padding: '14px 16px',
                                                borderBottom: '1px solid #F3F4F6',
                                                color: '#1F2937'
                                            }}>{detail.no}</td>
                                            <td style={{
                                                padding: '14px 16px',
                                                textAlign: 'center',
                                                borderBottom: '1px solid #F3F4F6',
                                                color: '#1F2937'
                                            }}>{detail.numberOfFortnights}</td>
                                            <td style={{
                                                padding: '14px 16px',
                                                textAlign: 'right',
                                                borderBottom: '1px solid #F3F4F6',
                                                color: '#1F2937',
                                                fontWeight: '500'
                                            }}>K {detail.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                            <td style={{
                                                padding: '14px 16px',
                                                textAlign: 'right',
                                                borderBottom: '1px solid #F3F4F6',
                                                color: '#1F2937',
                                                fontWeight: '500'
                                            }}>K {detail.efiPrinciple.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                            <td style={{
                                                padding: '14px 16px',
                                                textAlign: 'right',
                                                borderBottom: '1px solid #F3F4F6',
                                                color: '#1F2937',
                                                fontWeight: '500'
                                            }}>K {detail.efiInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Personal Documents Section - SEPARATE CARD */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '30px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    border: '2px solid #E5E7EB',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '24px'
                    }}>
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#1F2937',
                            margin: 0
                        }}>
                            Personal Documents
                        </h2>
                    </div>
                    <hr style={{ border: 'none', borderTop: '2px solid #8B5CF6', marginBottom: '30px', width: '60px' }} />

                    {/* File Attachments Row - 4 sections */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '20px'
                    }}>
                        {[1, 2, 3, 4].map((fileNum) => (
                            <div key={fileNum}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#4B5563',
                                    marginBottom: '8px'
                                }}>
                                    Attachment {fileNum}
                                </label>
                                <label
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '12px 16px',
                                        border: '2px dashed #D1D5DB',
                                        borderRadius: '8px',
                                        backgroundColor: '#F9FAFB',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        fontSize: '14px',
                                        color: '#6B7280',
                                        gap: '8px'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.borderColor = '#3B82F6';
                                        e.currentTarget.style.backgroundColor = '#EFF6FF';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.borderColor = '#D1D5DB';
                                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                                    }}
                                >
                                    <FaPaperclip size={16} />
                                    <span>
                                        {(fileNum === 1 && file1) ||
                                            (fileNum === 2 && file2) ||
                                            (fileNum === 3 && file3) ||
                                            (fileNum === 4 && file4)
                                            ? ((fileNum === 1 && file1?.name) ||
                                                (fileNum === 2 && file2?.name) ||
                                                (fileNum === 3 && file3?.name) ||
                                                (fileNum === 4 && file4?.name)).substring(0, 15) + '...'
                                            : 'Choose File'
                                        }
                                    </span>
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(fileNum, e)}
                                        style={{ display: 'none' }}
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div style={{
                    textAlign: 'center'
                }}>
                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: '14px 48px',
                            backgroundColor: '#3B82F6',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2563EB'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3B82F6'}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EMICalculatorPage;
