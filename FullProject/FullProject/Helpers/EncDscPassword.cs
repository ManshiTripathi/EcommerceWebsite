using System.Text;

namespace FullProject.Helpers
{
    public static class EncDscPassword
    {
        public static string secretkey = "@123secretkeydontshare";

        public static  string EncryptPassword(string Passcode)
        {
            if (string.IsNullOrEmpty(Passcode))
            {
                return "";
            }
            else
            {
                Passcode = Passcode + secretkey;
                var PasscodeinBytes =Encoding.UTF8.GetBytes(Passcode);
                return Convert.ToBase64String(PasscodeinBytes);
            }
        }

        public static string DecryptPassword(string encryptedPasscode)
        {
            if (string.IsNullOrEmpty(encryptedPasscode))
            {
                return "";
            }
            else
            {
               
                var encodedinBytes = Convert.FromBase64String(encryptedPasscode);
               var actualPassword = Encoding.UTF8.GetString(encodedinBytes);
                actualPassword = actualPassword.Substring(0, actualPassword.Length - secretkey.Length);
                return actualPassword;
            }
        }
    }
}
