using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mindbodynoob.Models
{
    public class User
    {
        public string Email;
        public string Password;
        public bool[] Arr;
        public int NumComplete;

        public User(string email, string password)
        {
            this.Email = email;
            this.Password = password;
            Arr = new bool[20];
            NumComplete = 0;
        }

        //public string GetEmail()
        //{
        //    return Email;
        //}

        //public string GetPassword()
        //{
        //    return Password;
        //}

        //public bool GetCBoxState(int cBoxNum)
        //{
        //    return Arr[cBoxNum];
        //}

        public void SetCBoxState(int cBoxNum, bool state)
        {
            //not protecting against making a checkbox that is already checked, checked/vice versa
            Arr[cBoxNum] = state;
            if (state)
                NumComplete++;
            else
                NumComplete--;
        }
    }
}