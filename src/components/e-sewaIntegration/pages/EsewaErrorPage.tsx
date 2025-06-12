
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import ErrorIcon from '@mui/icons-material/Error';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';


const EsewaErrorPage= () => {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    // Navigate back to checkout or pricing page
    navigate('/vaidik/cart');
  };

  const handleGoHome = () => {
    navigate('/vaidik/store');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <ErrorIcon className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Payment Failed
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              We couldn't process your payment. Don't worry, you haven't been charged.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Common reasons for payment failure:</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Insufficient funds</li>
                <li>• Incorrect card details</li>
                <li>• Card expired or blocked</li>
                <li>• Bank security restrictions</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleRetryPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                <CreditCardIcon className="w-4 h-4 mr-2" />
                Try Payment Again
              </Button>
              
              <Button 
                onClick={handleGoHome}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <ArrowBackIcon className="w-4 h-4 mr-2" />
                Go Back Home
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-500 mb-2">
                Need help? Contact our support team
              </p>
              <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0">
                suppliersvaidik@gmail.com
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Your payment information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default EsewaErrorPage;