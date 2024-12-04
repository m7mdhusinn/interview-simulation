import express from 'express';
import sql from 'mssql';
import cors from 'cors';
import { HfInference } from '@huggingface/inference'; // استيراد مكتبة Hugging Face

const app = express();
app.use(cors());
app.use(express.json());

// إعداد الاتصال بـ SQL Server
const dbConfig = {
  user: 'sa',
  password: 'sa1',
  server: '127.0.0.1',
  database: 'InterviewDB',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

// التحقق من الاتصال بقاعدة البيانات
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('تم الاتصال بـ SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('فشل الاتصال بـ SQL Server:', err);
  });

// Endpoint للحصول على الأسئلة
app.get('/api/questions', async (req, res) => {
  try {
    const pool = await poolPromise; // استخدام الاتصال الصحيح
    const result = await pool.request().query('SELECT * FROM Questions');
    res.json(result.recordset);  // إرجاع البيانات كـ JSON
  } catch (err) {
    console.error('فشل جلب الأسئلة:', err);
    res.status(500).send('خطأ في الاتصال بقاعدة البيانات');
  }
});

// Endpoint لحفظ وتقييم الإجابات
app.post('/api/save-evaluate', async (req, res) => {
  const { questionId, answerText, userId } = req.body;

  if (!questionId || !answerText || !userId) {
    return res.status(400).json({ message: 'يجب إرسال جميع البيانات المطلوبة.' });
  }

  try {
    // حفظ الإجابات في قاعدة البيانات
    await saveAnswersToDB(questionId, answerText, userId);
    
    // تقييم الإجابات باستخدام Hugging Face
    const evaluationResults = await evaluateWithAI(answerText);

    res.status(200).json({ message: 'تم التقييم بنجاح', results: evaluationResults });
  } catch (error) {
    console.error('Error saving or evaluating:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء معالجة الإجابة' });
  }
});

// دالة لحفظ الإجابات في قاعدة البيانات
async function saveAnswersToDB(questionId, answerText, userId) {
  const pool = await poolPromise; // استخدام الاتصال الصحيح
  try {
    await pool.request()
      .input('QuestionID', sql.Int, questionId)
      .input('AnswerText', sql.NVarChar, answerText)
      .input('UserID', sql.Int, userId)
      .query('INSERT INTO Answers (QuestionID, AnswerText, UserID, SubmittedAt) VALUES (@QuestionID, @AnswerText, @UserID, GETDATE())');
    console.log('تم حفظ الإجابة في قاعدة البيانات');
  } catch (error) {
    console.error('خطأ أثناء حفظ الإجابة:', error);
    throw new Error('فشل حفظ الإجابة في قاعدة البيانات');
  }
}

// إعداد Hugging Face API
const hf = new HfInference('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'); // استبدالها بمفتاح API الخاص بـ Hugging Face

// دالة تقييم الإجابة باستخدام Hugging Face
// دالة لتقييم الإجابة باستخدام Hugging Face
// دالة لتقييم الإجابة باستخدام Hugging Face
// دالة لتقييم الإجابة باستخدام Hugging Face
async function evaluateWithAI(answerText) {
    try {
      const prompt = `
        تقييم إجابة المستخدم على سؤال مقابلة عمل.
        الإجابة: "${answerText}"
        قم بتقييم الإجابة على مقياس من 1 إلى 10 وقدم ملاحظات بناءة.
        النتيجة يجب أن تكون في هذا التنسيق:
        {"score": <score>, "feedback": "<feedback>"}
      `;
  
      console.log('Request sent to Hugging Face with prompt:', prompt); // تأكد من إرسال الطلب
  
      // إرسال الطلب إلى Hugging Face
      const response = await hf.textGeneration({
          model: 'gpt2',  // اختر النموذج المناسب من Hugging Face
          inputs: prompt,
          parameters: {
            max_length: 150,
            temperature: 0.7,
          },
        });
  
      console.log('Response from Hugging Face:', response); // طباعة الاستجابة للتحقق من الوصول إليها
  
      // تأكد من أن الاستجابة تحتوي على النص المطلوب
      if (response && response.generated_text) {
        const evaluation = parseEvaluation(response.generated_text); // تحليل النص المولد
        return evaluation;
      } else {
        console.error('فشل الحصول على النص المولد من Hugging Face');
        throw new Error('فشل الحصول على النص المولد من Hugging Face');
      }
    } catch (error) {
      console.error('خطأ في تقييم الإجابة:', error);
      throw new Error('فشل التقييم باستخدام Hugging Face');
    }
  }
  
  // دالة لتحليل النص المولد لاستخراج الدرجة والتعليقات
  function parseEvaluation(generatedText) {
    console.log('Generated Text:', generatedText); // طباعة النص المولد للتحقق من شكله
  
    // تحديث التعبير المنتظم ليكون أكثر مرونة
    const scoreMatch = generatedText.match(/"score":\s*(\d+)/);
    const feedbackMatch = generatedText.match(/"feedback":\s*"([^"]+)"/);
  
    // إذا لم يتم العثور على الدرجة أو التعليقات، فإرجاع قيمة افتراضية
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0; // استخراج الدرجة
    const feedback = feedbackMatch ? feedbackMatch[1] : 'لا توجد تعليقات'; // التعليقات
  
    console.log('Extracted Score:', score);  // طباعة الدرجة المستخرجة
    console.log('Extracted Feedback:', feedback);  // طباعة التعليقات المستخرجة
  
    return { score, feedback };
  }
        


// بدء تشغيل الخادم
const port = 5000;
app.listen(port, () => {
  console.log(`الخادم يعمل على المنفذ ${port}`);
});
