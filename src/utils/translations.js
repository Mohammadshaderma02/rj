export const translations = {
  en: {
    languageButton: "العربية",
    title: "Dear Customer,",
    description: "Please press \"inquire\" button below to display all MSISDNs associated under your national ID number.\n\nPlease note that this list is tied to your national number, please don't share this page or link with anyone",
    inquireButton: "Inquire",
    expireNote: "Please note that this page will expired in 7 days from receiving the link SMS",
    registeredNumbers: "You have the below numbers register under your national number",
    downloadPDF: "Download as PDF",
    mobile: "Mobile",
    broadband: "Broadband Internet",
    fiber: "Fiber",
    prepaid: "Prepaid",
    postpaid: "Postpaid",
    bline: "Hybrid",
    loading: "Loading...",
    error: "Error loading data",
    noData: "No data available"
  },
  ar: {
    languageButton: "English",
    title: "عزيزي العميل،",
    description: "يرجى الضغط على زر \"استعلام\" أدناه لعرض جميع أرقام الهواتف المرتبطة برقم هويتك الوطنية.\n\nيرجى ملاحظة أن هذه القائمة مرتبطة برقمك الوطني، يرجى عدم مشاركة هذه الصفحة أو الرابط مع أي شخص",
    inquireButton: "استعلام",
    expireNote: "يرجى ملاحظة أن هذه الصفحة ستنتهي صلاحيتها خلال 7 أيام من استلام رسالة الرابط",
    registeredNumbers: "لديك الأرقام التالية مسجلة تحت رقمك الوطني",
    downloadPDF: "تحميل بصيغة PDF",
    mobile: "خط مكالمات",
    broadband: "انترنت برودباند",
    fiber: "ألياف ضوئية",
    prepaid: "الدفع مسبقا",
    postpaid: "فاتورة شهرية",
    bline: "هجين",
    loading: "جاري التحميل...",
    error: "خطأ في تحميل البيانات",
    noData: "لا توجد بيانات متاحة"
  }
};

export const getTranslation = (key, language) => {
  return translations[language]?.[key] || translations.en[key] || key;
};