﻿using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PantAPI.Models
{
    public class UserToken : TableEntity
    {
        public UserToken(string partitionKey, string token, string userId) : base(partitionKey, token)
        {
            UserId = userId;
        }

        public UserToken()
        {
        }

        public string Token => PartitionKey;
        public string UserId { get; set; }
    }
}
